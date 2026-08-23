'use server'

import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getClientPendingRequests() {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return []
    }

    const userId = session.user.id

    const lReqs = await prisma.licenseRequest.findMany({
      where: { userId, status: 'pending' },
      orderBy: { createdAt: 'desc' }
    })
    
    const sReqs = await prisma.systemRequest.findMany({
      where: { userId, status: 'pending' },
      orderBy: { createdAt: 'desc' }
    })

    const combined = [
      ...lReqs.map(r => ({ ...r, requestType: 'license' })),
      ...sReqs.map(r => ({ ...r, tier: r.type === 'web' ? 'Web System' : r.type === 'app' ? 'App System' : 'Free Web System', requestType: 'system' }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return combined
  } catch (error) {
    console.error("Error fetching client pending requests:", error)
    return []
  }
}

export async function undoRequest(requestId: string, requestType: 'license' | 'system') {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: 'Unauthorized' }
    }

    if (requestType === 'license') {
      const req = await prisma.licenseRequest.findUnique({ where: { id: requestId } })
      if (!req || req.userId !== session.user.id || req.status !== 'pending') {
        return { success: false, error: 'Invalid request' }
      }
      await prisma.licenseRequest.delete({ where: { id: requestId } })
    } else {
      const req = await prisma.systemRequest.findUnique({ where: { id: requestId } })
      if (!req || req.userId !== session.user.id || req.status !== 'pending') {
        return { success: false, error: 'Invalid request' }
      }
      await prisma.systemRequest.delete({ where: { id: requestId } })
    }

    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    console.error("Error undoing request:", error)
    return { success: false, error: 'Failed to undo request' }
  }
}

export async function getClientApprovedSystems() {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return []
    }

    const userId = session.user.id

    const systems = await prisma.systemRequest.findMany({
      where: { userId, status: 'approved' },
      orderBy: { updatedAt: 'desc' }
    })
    
    return systems
  } catch (error) {
    console.error("Error fetching client approved systems:", error)
    return []
  }
}
