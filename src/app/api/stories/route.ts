import { NextResponse } from 'next/server';

export async function GET() {
  const stories = (await import('@/data/stories')).stories;
  return NextResponse.json(stories);
}
