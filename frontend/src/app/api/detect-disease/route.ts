import { NextResponse } from 'next/server';

export async function POST() {
    return NextResponse.json({
        disease: 'Leaf Blight',
        confidence: 0.92,
        remedy: 'Apply appropriate fungicide and ensure proper drainage.',
    });
}
