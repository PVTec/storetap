'use server'

import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getPendingRequestsCount() {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session || (session.user.email !== 'vincentlayonuser@gmail.com' && session.user.email !== 'admin@vince.dev')) {
      return 0
    }

    const count = await prisma.licenseRequest.count({
      where: { status: 'pending' }
    })
    return count
  } catch (error) {
    return 0
  }
}

export async function getLicenseRequests() {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session || (session.user.email !== 'vincentlayonuser@gmail.com' && session.user.email !== 'admin@vince.dev')) {
      return []
    }

    const requests = await prisma.licenseRequest.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return requests
  } catch (error) {
    console.error("Error fetching requests:", error)
    return []
  }
}
export async function getApprovedRequests() {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session || (session.user.email !== 'vincentlayonuser@gmail.com' && session.user.email !== 'admin@vince.dev')) {
      return []
    }

    const requests = await prisma.licenseRequest.findMany({
      where: { status: 'approved' },
      orderBy: { createdAt: 'desc' }
    })
    return requests
  } catch (error) {
    return []
  }
}

export async function getUsersList() {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session || (session.user.email !== 'vincentlayonuser@gmail.com' && session.user.email !== 'admin@vince.dev')) {
      return []
    }

    // Fetch distinct users based on their license requests
    const users = await prisma.licenseRequest.findMany({
      distinct: ['email'],
      select: {
        userId: true,
        name: true,
        email: true,
        contactNumber: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })
    return users
  } catch (error) {
    return []
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

    // Check if the user is the admin
    if (!session || (session.user.email !== 'vincentlayonuser@gmail.com' && session.user.email !== 'admin@vince.dev')) {
      return { success: false, error: 'Unauthorized. Only the admin can approve requests.' }
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
        status: 'active',
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

    // Check if the user is the admin
    if (!session || (session.user.email !== 'vincentlayonuser@gmail.com' && session.user.email !== 'admin@vince.dev')) {
      return { success: false, error: 'Unauthorized. Only the admin can reject requests.' }
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
