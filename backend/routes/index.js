const express = require('express');
const router = express.Router();

// Dummy data for initial test
const crops = [
    { id: 1, name: 'Wheat' },
    { id: 2, name: 'Rice' },
    { id: 3, name: 'Tomato' }
];

router.get('/crops', (req, res) => {
    res.json(crops);
});

router.get('/markets', (req, res) => {
    res.json([{ id: 1, name: 'Delhi Mandi', location: 'Delhi' }]);
});

router.get('/prices', (req, res) => {
    res.json([{ crop_id: 1, market_id: 1, price: 2200, date: new Date().toISOString() }]);
});

router.post('/profit', (req, res) => {
    const { quantity, cost, marketPrice } = req.body;
    const profit = (marketPrice * quantity) - cost;
    res.json({ profit });
});

router.get('/trends', (req, res) => {
    res.json([{ date: '2026-03-01', price: 2100 }, { date: '2026-03-05', price: 2150 }, { date: '2026-03-10', price: 2200 }]);
});

router.get('/schemes', (req, res) => {
    res.json([{ id: 1, title: 'Kisan Credit Card', description: 'Affordable credit for farmers' }]);
});

router.get('/news', (req, res) => {
    res.json([{ id: 1, headline: 'Wheat prices hit record high' }]);
});

router.get('/weather', (req, res) => {
    res.json({ temp: 30, condition: 'Sunny' });
});

// Mock Chatbot API (More detailed)
router.post('/chat', (req, res) => {
    const { message, language } = req.body;
    const lowerMsg = message?.toLowerCase() || '';

    let reply = 'I am your AgriConnect assistant. How can I help you today?';

    if (lowerMsg.includes('price') || lowerMsg.includes(' भाव')) {
        reply = "Current average prices: Wheat is ₹2300/Qtl, Soyabean is ₹4400/Qtl, and Onion is ₹1500/Qtl. You can visit the Market Prices tab to compare rates across local mandis.";
    } else if (lowerMsg.includes('weather') || lowerMsg.includes('मौसम')) {
        reply = "Expect partly cloudy condition today with 28°C. Rain is forecast for Wednesday. Delay spraying pesticides if possible.";
    } else if (lowerMsg.includes('scheme') || lowerMsg.includes('yojana') || lowerMsg.includes('loan') || lowerMsg.includes('योजना')) {
        reply = "You might be eligible for PM-KISAN (₹6000/yr) and the KCC Loan (Up to ₹3 Lakh). Visit the Govt Schemes page in the sidebar to check your exact eligibility.";
    } else if (lowerMsg.includes('disease') || lowerMsg.includes('sick') || lowerMsg.includes('बीमारी')) {
        reply = "To identify a crop disease, please use the 'Disease Scanner' from the sidebar menu to upload a clear photo of the infected leaf.";
    }

    // Very basic translation simulation based on language flag
    if (language === 'hi' && reply.includes('average prices')) {
        reply = "वर्तमान औसत मूल्य: गेहूं ₹2300/क्विंटल, सोयाबीन ₹4400/क्विंटल, और प्याज ₹1500/क्विंटल है।";
    } else if (language === 'hi' && reply.includes('partly cloudy')) {
        reply = "आज 28°C के साथ आंशिक रूप से बादल छाए रहने की उम्मीद है। बुधवार को बारिश का अनुमान है।";
    }

    res.json({ reply });
});

router.post('/detect-disease', (req, res) => {
    // Placeholder for Vision AI logic
    res.json({
        disease: 'Leaf Blight',
        confidence: 0.92,
        remedy: 'Apply appropriate fungicide and ensure proper drainage.'
    });
});

router.post('/alerts/subscribe', (req, res) => {
    const { phone, crop, market } = req.body;
    // Placeholder for DB save + SMS logic
    res.json({ status: 'success', message: `Subscribed ${phone} to alerts for ${crop} at ${market}.` });
});

module.exports = router;
