import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ name: 'John Doe', method: 'GET' });
}

export async function POST() {
  return NextResponse.json({ name: 'Marcelol090'});
}
