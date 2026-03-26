import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are AgriBot, the AI assistant for AgriConnect — an Indian agriculture platform. 
You are an expert in farming, crop prices, weather, government schemes, soil health, pest control, and agricultural best practices.
- Be concise but helpful (2-4 sentences max).
- If the user asks about crop prices, give realistic Indian mandi prices in ₹/Quintal.
- If the user asks about weather, give practical farming advice.
- If the user asks about government schemes, mention real Indian schemes like PM-KISAN, KCC, PMFBY.
- You can answer general questions too, but always relate back to agriculture when relevant.
- Support Hindi and English. If the user writes in Hindi, reply in Hindi.
- Be friendly and use simple language that farmers can understand.`;

export async function POST(request: NextRequest) {
    const { message, language } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback to basic responses if no API key
    if (!apiKey) {
        return NextResponse.json({ reply: getFallbackReply(message, language) });
    }

    try {
        const langHint = language && language !== 'en' ? `\nRespond in the language with code: ${language}` : '';

        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}${langHint}\n\nUser: ${message}` }] }
                    ],
                    generationConfig: {
                        maxOutputTokens: 300,
                        temperature: 0.7,
                    }
                })
            }
        );

        if (!res.ok) {
            console.error('Gemini API error:', res.status, await res.text());
            return NextResponse.json({ reply: getFallbackReply(message, language) });
        }

        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || getFallbackReply(message, language);

        return NextResponse.json({ reply: reply.trim() });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json({ reply: getFallbackReply(message, language) });
    }
}

function getFallbackReply(message: string, language: string): string {
    const lowerMsg = message?.toLowerCase() || '';

    if (lowerMsg.includes('price') || lowerMsg.includes('भाव') || lowerMsg.includes('rate')) {
        return "Current average prices: Wheat ₹2300/Qtl, Soyabean ₹4400/Qtl, Onion ₹1500/Qtl. Visit the Market Prices tab for live mandi rates.";
    } else if (lowerMsg.includes('weather') || lowerMsg.includes('मौसम')) {
        return "Expect partly cloudy conditions today with 28°C. Rain forecast for Wednesday. Delay spraying pesticides if possible.";
    } else if (lowerMsg.includes('scheme') || lowerMsg.includes('yojana') || lowerMsg.includes('loan') || lowerMsg.includes('योजना')) {
        return "You may be eligible for PM-KISAN (₹6000/yr) and KCC Loan (up to ₹3 Lakh). Visit the Govt Schemes page to check eligibility.";
    } else if (lowerMsg.includes('disease') || lowerMsg.includes('sick') || lowerMsg.includes('बीमारी')) {
        return "To identify a crop disease, use the 'Disease Scanner' from the sidebar to upload a photo of the infected leaf.";
    }

    return "I am AgriBot, your farming assistant. Ask me about crop prices, weather, government schemes, pest control, or any agriculture topic!";
}
