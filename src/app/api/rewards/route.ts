import { NextResponse } from 'next/server';
import { badges, cosmetics } from '@/data/worlds';

export async function GET() {
  return NextResponse.json({ badges, cosmetics });
}
