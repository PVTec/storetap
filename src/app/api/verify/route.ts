import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { key, deviceId, websiteUrl } = await request.json();

    if (!key || !deviceId) {
      return NextResponse.json({ status: 'error', message: 'Missing key or deviceId' }, { status: 400 });
    }

    const license = await prisma.license.findUnique({
      where: { licenseKey: key }
    });

    if (!license) {
      return NextResponse.json({ status: 'invalid', message: 'License key not found' });
    }

    if (license.status === 'banned') {
      return NextResponse.json({ status: 'banned', message: 'This license has been banned' });
    }

    // Check if expired
    if (license.expiresAt && new Date() > license.expiresAt) {
      if (license.status !== 'expired') {
        await prisma.license.update({ where: { id: license.id }, data: { status: 'expired' } });
      }
      return NextResponse.json({ status: 'expired', message: 'This license has expired' });
    }

    if (license.status === 'unused') {
      // First time activation
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + license.durationDays);

      const updated = await prisma.license.update({
        where: { id: license.id },
        data: {
          status: 'active',
          deviceId: deviceId,
          websiteUrl: websiteUrl || 'unknown',
          activatedAt: new Date(),
          expiresAt: expiresAt
        }
      });

      return NextResponse.json({ 
        status: 'valid', 
        message: 'License activated successfully',
        tier: updated.tier,
        expiresAt: updated.expiresAt
      });
    }

    // If active, verify device ID
    if (license.status === 'active') {
      if (license.deviceId !== deviceId) {
        return NextResponse.json({ status: 'used', message: 'This license is already bound to another device or website' });
      }
      
      // All good
      return NextResponse.json({ 
        status: 'valid', 
        message: 'License verified',
        tier: license.tier,
        expiresAt: license.expiresAt
      });
    }

    return NextResponse.json({ status: 'invalid', message: 'Unknown status' });

  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}
