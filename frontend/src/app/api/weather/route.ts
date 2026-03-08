import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ temp: 30, condition: 'Sunny' });
}
