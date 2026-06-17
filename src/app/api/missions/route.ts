import { NextResponse } from 'next/server';
import { dailyMissions } from '@/data/missions';

export async function GET() {
  return NextResponse.json(dailyMissions);
}
