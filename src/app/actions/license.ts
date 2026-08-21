'use server'

import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'

export async function createLicenseRequest(data: { name: string, email: string, contactNumber: string, tier: string }) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    const randomPart = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    const licenseKey = `${data.tier.toUpperCase()}-${randomPart()}-${randomPart()}-${randomPart()}`;
    const referenceNumber = `REF-${randomPart()}-${randomPart()}`;

    const request = await prisma.licenseRequest.create({
      data: {
        userId: session?.user?.id || null,
        referenceNumber,
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
        tier: data.tier,
        status: 'pending',
        licenseKey: licenseKey
      }
    })

    await prisma.notification.create({
      data: {
        userId: 'admin',
        title: 'New License Request',
        message: `${data.name} has requested a ${data.tier} license.`
      }
    })

    return { success: true, request }
  } catch (error: any) {
    console.error("Error creating license request:", error)
    return { success: false, error: "Failed to create request. Please try again later." }
  }
}
