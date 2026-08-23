'use server'

import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getUserRole(email: string | undefined | null) {
  if (!email) return 'client'
  
  // Hardcoded superadmins
  if (email === 'vincentlayonuser@gmail.com' || email === 'admin@vince.dev') {
    return 'admin'
  }
  
  try {
    const user = await prisma.userRole.findUnique({
      where: { email }
    })
    return user?.role || 'client'
  } catch (error) {
    return 'client'
  }
}

export async function getClientRole() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return 'client'
  return await getUserRole(session.user.email)
}

export async function getClientData() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null
  try {
    const user = await prisma.userRole.findUnique({
      where: { email: session.user.email }
    })
    if (user && (user.email === 'vincentlayonuser@gmail.com' || user.email === 'admin@vince.dev')) {
      user.role = 'admin'
    }
    return user
  } catch (e) {
    return null
  }
}

export async function syncUserToDatabase(email: string, name: string | null) {
  try {
    const existing = await prisma.userRole.findUnique({ where: { email } })
    const isSuperAdmin = email === 'vincentlayonuser@gmail.com' || email === 'admin@vince.dev'
    
    if (!existing) {
      await prisma.userRole.create({
        data: {
          email,
          name: name || 'Unknown',
          role: isSuperAdmin ? 'admin' : 'client'
        }
      })
    } else if (isSuperAdmin && existing.role !== 'admin') {
      await prisma.userRole.update({
        where: { email },
        data: { role: 'admin' }
      })
    }
    return { success: true }
  } catch (error) {
    console.error("Error syncing user:", error)
    return { success: false }
  }
}

export async function sendProviderOTP(phone: string) {
  // In a real application, you would integrate Twilio or Supabase SMS here.
  // For this implementation, we simulate an SMS being sent successfully.
  return { success: true, message: 'OTP sent to ' + phone }
}

export async function verifyProviderOTP(email: string, phone: string, code: string) {
  // Mock verification: accepting '123456' as the correct OTP
  if (code !== '123456') {
    return { success: false, error: 'Invalid OTP code. Please use 123456 for testing.' }
  }

  try {
    await prisma.userRole.update({
      where: { email },
      data: {
        contactNumber: phone,
        phoneVerified: true,
        isProviderOnboarded: true
      }
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to update user profile.' }
  }
}

export async function getPendingRequestsCount() {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return 0
    const role = await getUserRole(session.user.email)
    if (role !== 'admin' && role !== 'provider') return 0

    const lCount = await prisma.licenseRequest.count({ where: { status: 'pending' } })
    const sCount = await prisma.systemRequest.count({ where: { status: 'pending' } })
    return lCount + sCount
  } catch (error) {
    return 0
  }
}

export async function getPendingRequests() {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return []
    const role = await getUserRole(session.user.email)
    if (role !== 'admin' && role !== 'provider') return []

    const lReqs = await prisma.licenseRequest.findMany({ where: { status: 'pending' }, orderBy: { createdAt: 'desc' } })
    const sReqs = await prisma.systemRequest.findMany({ where: { status: 'pending' }, orderBy: { createdAt: 'desc' } })

    const combined = [
      ...lReqs.map(r => ({ ...r, requestType: 'license' })),
      ...sReqs.map(r => ({ ...r, tier: r.type === 'web' ? 'Web System' : 'App System', requestType: 'system' }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return combined
  } catch (error) {
    console.error("Error fetching requests:", error)
    return []
  }
}

export async function getApprovedLicenseRequests() {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return []
    const role = await getUserRole(session.user.email)
    if (role !== 'admin' && role !== 'provider') return []

    const lReqs = await prisma.licenseRequest.findMany({
      where: { status: 'approved' },
      orderBy: { createdAt: 'desc' }
    })
    
    return lReqs.map(r => ({ ...r, requestType: 'license' }))
  } catch (error) {
    return []
  }
}

export async function getApprovedSystemRequests() {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return []
    const role = await getUserRole(session.user.email)
    if (role !== 'admin' && role !== 'provider') return []

    const sReqs = await prisma.systemRequest.findMany({
      where: { status: 'approved' },
      orderBy: { createdAt: 'desc' }
    })
    
    return sReqs.map(r => ({ ...r, tier: r.type === 'web' ? 'Web System' : 'App System', requestType: 'system' }))
  } catch (error) {
    return []
  }
}

export async function getUsersList() {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return []
    const role = await getUserRole(session.user.email)
    if (role !== 'admin') return []

    // Fetch existing users from UserRole
    const userRoles = await prisma.userRole.findMany({
      where: {
        email: { not: 'vincentlayonuser@gmail.com' }
      },
      orderBy: { email: 'asc' }
    })

    // Sync users from requests that might not be in UserRole yet
    const distinctEmailsFromRequests = await prisma.licenseRequest.findMany({
      distinct: ['email'],
      select: { email: true, name: true, createdAt: true }
    })

    for (const req of distinctEmailsFromRequests) {
      if (!userRoles.find(ur => ur.email === req.email)) {
        const newRole = await prisma.userRole.create({
          data: {
            email: req.email,
            name: req.name,
            role: 'client'
          }
        })
        userRoles.push(newRole)
      }
    }

    // Get latest contact number and earliest createdAt from LicenseRequest
    const requests = await prisma.licenseRequest.findMany({
      orderBy: { createdAt: 'asc' },
      select: { email: true, contactNumber: true, createdAt: true }
    })

    const userInfoMap = new Map()
    requests.forEach(req => {
      if (!userInfoMap.has(req.email)) {
        userInfoMap.set(req.email, { createdAt: req.createdAt, contactNumber: req.contactNumber })
      } else {
        // Update contact number to the latest one
        const existing = userInfoMap.get(req.email)
        existing.contactNumber = req.contactNumber
      }
    })

    return userRoles.map(ur => {
      const info = userInfoMap.get(ur.email)
      return {
        ...ur,
        contactNumber: ur.contactNumber || info?.contactNumber || 'N/A',
        createdAt: info?.createdAt || new Date().toISOString()
      }
    })
  } catch (error) {
    return []
  }
}

export async function deleteUsers(emails: string[]) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return { success: false }
    const role = await getUserRole(session.user.email)
    if (role !== 'admin') return { success: false }

    await prisma.userRole.deleteMany({
      where: { email: { in: emails } }
    })
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete users' }
  }
}

export async function updateUserRole(email: string, newRole: string) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return { success: false }
    const role = await getUserRole(session.user.email)
    if (role !== 'admin') return { success: false }

    await prisma.userRole.update({
      where: { email },
      data: { role: newRole }
    })
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to update role' }
  }
}

export async function getNotifications(isAdmin: boolean) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return []

    const targetUserId = isAdmin ? 'admin' : session.user.id

    const notifications = await prisma.notification.findMany({
      where: { userId: targetUserId },
      orderBy: { createdAt: 'desc' },
      take: 50 // limit to latest 50
    })
    return notifications
  } catch (error) {
    return []
  }
}

export async function markNotificationsRead(isAdmin: boolean) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return { success: false }

    const targetUserId = isAdmin ? 'admin' : session.user.id

    await prisma.notification.updateMany({
      where: { userId: targetUserId, read: false },
      data: { read: true }
    })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export async function approveLicenseRequest(requestId: string) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return { success: false, error: 'Unauthorized.' }
    const role = await getUserRole(session.user.email)
    if (role !== 'admin' && role !== 'provider') {
      return { success: false, error: 'Unauthorized. Only admins or providers can approve requests.' }
    }

    const request = await prisma.licenseRequest.findUnique({
      where: { id: requestId }
    })

    if (!request) return { success: false, error: 'Request not found' }

    // Map tier to duration (simplified for now)
    const durationMap: Record<string, number> = {
      'Basic': 30,
      'Standard': 90,
      'Pro': 150
    }
    const durationDays = durationMap[request.tier] || 30

    // Fallback generate if old request doesn't have it
    const randomPart = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    const finalKey = request.licenseKey || `${request.tier.toUpperCase()}-${randomPart()}-${randomPart()}-${randomPart()}`;

    // Create the actual license
    await prisma.license.create({
      data: {
        licenseKey: finalKey,
        userId: request.userId,
        tier: request.tier.toLowerCase(),
        status: 'unused',
        durationDays
      }
    })

    // Update request status
    await prisma.licenseRequest.update({
      where: { id: requestId },
      data: { status: 'approved' }
    })

    if (request.userId) {
      await prisma.notification.create({
        data: {
          userId: request.userId,
          title: 'License Approved',
          message: `Your request for a ${request.tier} license has been approved! Your license key is ready.`
        }
      })
    }

    revalidatePath('/admin/requests')
    return { success: true }
  } catch (error: any) {
    console.error("Error approving license request:", error)
    return { success: false, error: "Failed to approve request." }
  }
}

export async function rejectLicenseRequest(requestId: string) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return { success: false, error: 'Unauthorized.' }
    const role = await getUserRole(session.user.email)
    if (role !== 'admin' && role !== 'provider') {
      return { success: false, error: 'Unauthorized. Only admins or providers can reject requests.' }
    }

    // Update the request status instead of deleting it, or delete it and notify
    const request = await prisma.licenseRequest.findUnique({
      where: { id: requestId }
    })

    if (!request) return { success: false, error: 'Request not found' }

    await prisma.licenseRequest.update({
      where: { id: requestId },
      data: { status: 'rejected' }
    })

    if (request.userId) {
      await prisma.notification.create({
        data: {
          userId: request.userId,
          title: 'License Request Rejected',
          message: `Your request for a ${request.tier} license has been rejected. Please contact support for more details.`
        }
      })
    }

    revalidatePath('/admin/requests')
    return { success: true }
  } catch (error: any) {
    console.error("Error rejecting license request:", error)
    return { success: false, error: "Failed to reject request." }
  }
}

export async function approveSystemRequest(requestId: string, attachmentLink?: string) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return { success: false, error: 'Unauthorized.' }
    const role = await getUserRole(session.user.email)
    if (role !== 'admin' && role !== 'provider') {
      return { success: false, error: 'Unauthorized. Only admins or providers can approve requests.' }
    }

    const request = await prisma.systemRequest.findUnique({
      where: { id: requestId }
    })

    if (!request) return { success: false, error: 'Request not found' }

    // Map system type to license tier
    const tier = request.type === 'web' ? 'basic' : 'pro'
    const durationDays = 30 // Bundled license duration

    const randomPart = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    const licenseKey = `${tier.toUpperCase()}-SYS-${randomPart()}-${randomPart()}`;

    // Create the bundled license
    await prisma.license.create({
      data: {
        licenseKey: licenseKey,
        userId: request.userId,
        tier: tier,
        status: 'unused',
        durationDays
      }
    })

    // Update system request status and attach link
    await prisma.systemRequest.update({
      where: { id: requestId },
      data: { status: 'approved', attachmentLink }
    })

    if (request.userId) {
      await prisma.notification.create({
        data: {
          userId: request.userId,
          title: 'System Request Approved',
          message: `Your ${request.type.toUpperCase()} System has been approved! We've bundled a 30-day ${tier.toUpperCase()} license for you. Your license key is ready in My Licenses.`
        }
      })
    }

    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    console.error("Error approving system request:", error)
    return { success: false, error: "Failed to approve system request." }
  }
}

export async function rejectSystemRequest(requestId: string) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return { success: false, error: 'Unauthorized.' }
    const role = await getUserRole(session.user.email)
    if (role !== 'admin' && role !== 'provider') {
      return { success: false, error: 'Unauthorized. Only admins or providers can reject requests.' }
    }

    const request = await prisma.systemRequest.findUnique({
      where: { id: requestId }
    })

    if (!request) return { success: false, error: 'Request not found' }

    await prisma.systemRequest.update({
      where: { id: requestId },
      data: { status: 'rejected' }
    })

    if (request.userId) {
      await prisma.notification.create({
        data: {
          userId: request.userId,
          title: 'System Request Rejected',
          message: `Your request for a ${request.type.toUpperCase()} System has been rejected. Please contact support.`
        }
      })
    }

    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    console.error("Error rejecting system request:", error)
    return { success: false, error: "Failed to reject system request." }
  }
}

export async function generateCustomLicense(tier: string, durationDays: number) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return { success: false, error: 'Unauthorized' }
    const role = await getUserRole(session.user.email)
    if (role !== 'admin') {
      return { success: false, error: 'Unauthorized' }
    }

    const randomPart = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    const licenseKey = `${tier.toUpperCase()}-${randomPart()}-${randomPart()}-${randomPart()}`;

    const license = await prisma.license.create({
      data: {
        licenseKey,
        tier: tier.toLowerCase(),
        status: 'unused',
        durationDays
      }
    })

    revalidatePath('/dashboard')
    return { success: true, license }
  } catch (error) {
    console.error("Error generating custom license:", error)
    return { success: false, error: "Failed to generate license." }
  }
}

export async function getAdminGeneratedLicenses() {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return []
    const role = await getUserRole(session.user.email)
    if (role !== 'admin') return []

    const licenses = await prisma.license.findMany({
      where: { userId: null },
      orderBy: { id: 'desc' }
    })

    return licenses
  } catch (error) {
    console.error("Error fetching generated licenses:", error)
    return []
  }
}

export async function deleteGeneratedLicenses(ids: string[]) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return { success: false }
    const role = await getUserRole(session.user.email)
    if (role !== 'admin') return { success: false }

    await prisma.license.deleteMany({
      where: { id: { in: ids }, userId: null } // Only delete generated licenses
    })
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete licenses' }
  }
}

export async function deleteNotifications(ids: string[]) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return { success: false }
    const targetUserId = session.user.email === 'vincentlayonuser@gmail.com' || session.user.email === 'admin@vince.dev' ? 'admin' : session.user.id

    await prisma.notification.deleteMany({
      where: { id: { in: ids }, userId: targetUserId }
    })
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete notifications' }
  }
}
