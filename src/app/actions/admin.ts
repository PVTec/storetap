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

    revalidatePath('/admin/requests')
    return { success: true }
  } catch (error: any) {
    console.error("Error approving license request:", error)
    return { success: false, error: "Failed to approve request." }
  }
}
