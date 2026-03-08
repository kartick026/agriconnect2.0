import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json([
        { date: '2026-03-01', price: 2100 },
        { date: '2026-03-05', price: 2150 },
        { date: '2026-03-10', price: 2200 },
    ]);
}
