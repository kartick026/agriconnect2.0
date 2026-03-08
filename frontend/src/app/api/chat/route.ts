import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { message, language } = await request.json();
    const lowerMsg = message?.toLowerCase() || '';

    let reply = 'I am your AgriConnect assistant. How can I help you today?';

    if (lowerMsg.includes('price') || lowerMsg.includes('भाव')) {
        reply = "Current average prices: Wheat is ₹2300/Qtl, Soyabean is ₹4400/Qtl, and Onion is ₹1500/Qtl. You can visit the Market Prices tab to compare rates across local mandis.";
    } else if (lowerMsg.includes('weather') || lowerMsg.includes('मौसम')) {
        reply = "Expect partly cloudy condition today with 28°C. Rain is forecast for Wednesday. Delay spraying pesticides if possible.";
    } else if (lowerMsg.includes('scheme') || lowerMsg.includes('yojana') || lowerMsg.includes('loan') || lowerMsg.includes('योजना')) {
        reply = "You might be eligible for PM-KISAN (₹6000/yr) and the KCC Loan (Up to ₹3 Lakh). Visit the Govt Schemes page in the sidebar to check your exact eligibility.";
    } else if (lowerMsg.includes('disease') || lowerMsg.includes('sick') || lowerMsg.includes('बीमारी')) {
        reply = "To identify a crop disease, please use the 'Disease Scanner' from the sidebar menu to upload a clear photo of the infected leaf.";
    }

    // Basic translation simulation
    if (language === 'hi' && reply.includes('average prices')) {
        reply = "वर्तमान औसत मूल्य: गेहूं ₹2300/क्विंटल, सोयाबीन ₹4400/क्विंटल, और प्याज ₹1500/क्विंटल है।";
    } else if (language === 'hi' && reply.includes('partly cloudy')) {
        reply = "आज 28°C के साथ आंशिक रूप से बादल छाए रहने की उम्मीद है। बुधवार को बारिश का अनुमान है।";
    }

    return NextResponse.json({ reply });
}
