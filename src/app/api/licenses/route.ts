import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function getUser() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const licenses = await prisma.license.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(licenses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch licenses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
          userId: user.id,
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
