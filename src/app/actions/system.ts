'use server'
import prisma from '@/lib/prisma'

export async function createSystemRequest(data: { name: string; email: string; contactNumber: string; backupContact: string; storeName?: string; type: 'web' | 'app' }) {
  try {
    const request = await prisma.systemRequest.create({
      data: {
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
        backupContact: data.backupContact,
        storeName: data.storeName,
        type: data.type,
      }
    })

    // Also notify the admin
    await prisma.notification.create({
      data: {
        userId: 'admin',
        title: 'New System Order',
        message: `${data.name} just placed an order for the StoreTap ${data.type.toUpperCase()} Version!`,
      }
    })

    return { success: true, data: request }
  } catch (error) {
    console.error('Failed to create system request:', error)
    throw new Error('Failed to create system request')
  }
}
