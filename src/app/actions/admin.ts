'use server'

import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function approveLicenseRequest(requestId: string, licenseKey: string) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    // Check if the user is the admin
    if (!session || session.user.email !== 'vincentlayonuser@gmail.com') {
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

    // Create the actual license
    await prisma.license.create({
      data: {
        licenseKey,
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
