import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ error: 'Fitur pencarian belum tersedia.', hits: [] }, { status: 410 });
}
