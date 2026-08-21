import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const licenses = await prisma.license.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(licenses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch licenses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { tier, count, durationDays } = await request.json();
    
    const qty = parseInt(count) || 1;
    const days = parseInt(durationDays) || 30;
    
    const newLicenses = [];
    for (let i = 0; i < qty; i++) {
      // Generate a random key e.g., PRO-ABCD-1234-WXYZ
      const randomPart = () => Math.random().toString(36).substring(2, 6).toUpperCase();
      const key = `${tier.toUpperCase()}-${randomPart()}-${randomPart()}-${randomPart()}`;
      
      const license = await prisma.license.create({
        data: {
          licenseKey: key,
          tier: tier,
          durationDays: days,
          status: 'unused'
        }
      });
      newLicenses.push(license);
    }
    
    return NextResponse.json(newLicenses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate licenses' }, { status: 500 });
  }
}
