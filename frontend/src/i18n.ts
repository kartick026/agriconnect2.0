import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "Welcome": "Transparent Crop Pricing for Farmers",
            "CheckPrices": "Check Market Prices",
            "Dashboard": "Dashboard",
            "Prices": "Compare Prices",
            "Profit": "Profit Calculator",
            "Trends": "Market Trends",
            "Schemes": "Govt Schemes",
            "Disease": "Disease Scanner",
            "Chat": "Voice Assistant",
            "Price": "Price",
            "Crop": "Crop",
            "Market": "Market",
            "Community": "Community Forum",
            "Marketplace": "B2B Marketplace",
            "Equipment": "Equipment Rental",
            "Loans": "Loans & Insurance",
            "Profile": "Farm Profile",
            "Applications": "Applications",
            "VoiceAssisted": "Voice Assisted",
            "FarmersCommunity": "Farmers Community",
            "CommunityDesc": "Ask experts, share success stories, and connect with nearby farmers in an exclusive network.",
            "Feed": "Feed",
            "AskExpert": "Ask Expert",
            "MyRequests": "My Requests",
            "PostPlaceholder": "What's happening on your farm? Ask a question or share a photo...",
            "AddPhoto": "Add Photo",
            "PostUpdate": "Post Update"
        }
    },
    hi: {
        translation: {
            "Welcome": "किसानों के लिए पारदर्शी फसल मूल्य निर्धारण",
            "CheckPrices": "बाजार भाव देखें",
            "Dashboard": "डैशबोर्ड",
            "Prices": "कीमतों की तुलना करें",
            "Profit": "लाभ कैलकुलेटर",
            "Trends": "बाजार के रुझान",
            "Schemes": "सरकारी योजनाएं",
            "Disease": "रोग स्कैनर",
            "Chat": "आवाज सहायक",
            "Price": "कीमत",
            "Crop": "फसल",
            "Market": "बाज़ार",
            "Community": "समुदाय",
            "Marketplace": "बाज़ार",
            "Equipment": "उपकरण",
            "Loans": "ऋण",
            "Profile": "प्रोफ़ाइल",
            "Applications": "एप्लिकेशन",
            "VoiceAssisted": "आवाज़ द्वारा सहायता प्राप्त",
            "FarmersCommunity": "किसान समुदाय",
            "CommunityDesc": "विशेषज्ञों से पूछें, सफलता की कहानियाँ साझा करें, और एक विशेष नेटवर्क में आस-पास के किसानों से जुड़ें।",
            "Feed": "फ़ीड",
            "AskExpert": "विशेषज्ञ से पूछें",
            "MyRequests": "मेरे अनुरोध",
            "PostPlaceholder": "आपके खेत में क्या हो रहा है? कोई प्रश्न पूछें या फोटो साझा करें...",
            "AddPhoto": "फोटो जोड़ें",
            "PostUpdate": "अपडेट पोस्ट करें"
        }
    },
    mr: {
        translation: {
            "Welcome": "शेतकऱ्यांसाठी पारदर्शक पीक किंमत",
            "CheckPrices": "बाजारभाव तपासा",
            "Dashboard": "डॅशबोर्ड",
            "Prices": "किमतींची तुलना करा",
            "Profit": "नफा कॅल्क्युलेटर",
            "Trends": "बाजारातील कल",
            "Schemes": "सरकारी योजना",
            "Disease": "रोग स्कॅनर",
            "Chat": "आवाज सहाय्यक",
            "Price": "किंमत",
            "Crop": "पीक",
            "Market": "बाजार",
            "Community": "समुदाय",
            "Marketplace": "बाजारपेठ",
            "Equipment": "उपकरणे",
            "Loans": "कर्ज",
            "Profile": "प्रोफाइल",
            "Applications": "ॲप्लिकेशन्स",
            "VoiceAssisted": "आवाज सहाय्यित",
            "FarmersCommunity": "शेतकरी समुदाय",
            "CommunityDesc": "तज्ञांना विचारा, यशोगाथा शेअर करा आणि एका खास नेटवर्कमध्ये जवळपासच्या शेतकऱ्यांशी कनेक्ट व्हा.",
            "Feed": "फीड",
            "AskExpert": "तज्ञांना विचारा",
            "MyRequests": "माझ्या विनंत्या",
            "PostPlaceholder": "तुमच्या शेतात काय चालले आहे? प्रश्न विचारा किंवा फोटो शेअर करा...",
            "AddPhoto": "फोटो जोडा",
            "PostUpdate": "अपडेट पोस्ट करा"
        }
    },
    pa: {
        translation: {
            "Welcome": "ਕਿਸਾਨਾਂ ਲਈ ਪਾਰਦਰਸ਼ੀ ਫਸਲ ਕੀਮਤ",
            "CheckPrices": "ਬਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ ਦੀ ਜਾਂਚ ਕਰੋ",
            "Dashboard": "ਡੈਸ਼ਬੋਰਡ",
            "Prices": "ਕੀਮਤਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ",
            "Profit": "ਮੁਨਾਫਾ ਕੈਲਕੁਲੇਟਰ",
            "Trends": "ਬਾਜ਼ਾਰ ਦੇ ਰੁਝਾਨ",
            "Schemes": "ਸਰਕਾਰੀ ਸਕੀਮਾਂ",
            "Disease": "ਬਿਮਾਰੀ ਸਕੈਨਰ",
            "Chat": "ਵੌਇਸ ਅਸਿਸਟੈਂਟ",
            "Price": "ਕੀਮਤ",
            "Crop": "ਫਸਲ",
            "Market": "ਮੰਡੀ",
            "Community": "ਭਾਈਚਾਰਾ",
            "Marketplace": "ਮਾਰਕੀਟਪਲੇਸ",
            "Equipment": "ਉਪਕਰਨ",
            "Loans": "ਕਰਜ਼ੇ",
            "Profile": "ਪ੍ਰੋਫਾਈਲ",
            "Applications": "ਐਪਲੀਕੇਸ਼ਨਾਂ",
            "VoiceAssisted": "ਵੌਇਸ ਅਸਿਸਟਡ",
            "FarmersCommunity": "ਕਿਸਾਨ ਭਾਈਚਾਰਾ",
            "CommunityDesc": "ਮਾਹਰਾਂ ਨੂੰ ਪੁੱਛੋ, ਸਫਲਤਾ ਦੀਆਂ ਕਹਾਣੀਆਂ ਸਾਂਝੀਆਂ ਕਰੋ, ਅਤੇ ਇੱਕ ਵਿਸ਼ੇਸ਼ ਨੈੱਟਵਰਕ ਵਿੱਚ ਨੇੜਲੇ ਕਿਸਾਨਾਂ ਨਾਲ ਜੁੜੋ।",
            "Feed": "ਫੀਡ",
            "AskExpert": "ਮਾਹਰ ਨੂੰ ਪੁੱਛੋ",
            "MyRequests": "ਮੇਰੀਆਂ ਬੇਨਤੀਆਂ",
            "PostPlaceholder": "ਤੁਹਾਡੇ ਖੇਤ ਵਿੱਚ ਕੀ ਹੋ ਰਿਹਾ ਹੈ? ਕੋਈ ਸਵਾਲ ਪੁੱਛੋ ਜਾਂ ਫੋਟੋ ਸਾਂਝੀ ਕਰੋ...",
            "AddPhoto": "ਫੋਟੋ ਸ਼ਾਮਲ ਕਰੋ",
            "PostUpdate": "ਅੱਪਡੇਟ ਪੋਸਟ ਕਰੋ"
        }
    },
    ta: {
        translation: {
            "Welcome": "விவசாயிகளுக்கான வெளிப்படையான விலை நிர்ணயம்",
            "CheckPrices": "சந்தை விலையை சரிபார்க்கவும்",
            "Dashboard": "டாஷ்போர்டு",
            "Prices": "விலைகளை ஒப்பிடவும்",
            "Profit": "லாப கணக்கீட்டாளர்",
            "Trends": "சந்தை போக்குகள்",
            "Schemes": "அரசு திட்டங்கள்",
            "Disease": "நோய் ஸ்கேனர்",
            "Chat": "குரல் உதவியாளர்",
            "Price": "விலை",
            "Crop": "பயிர்",
            "Market": "சந்தை",
            "Community": "சமூகம்",
            "Marketplace": "சந்தை",
            "Equipment": "உபகரணங்கள்",
            "Loans": "கடன்",
            "Profile": "சுயவிவரம்",
            "Applications": "பயன்பாடுகள்",
            "VoiceAssisted": "குரல் உதவியது",
            "FarmersCommunity": "விவசாயிகள் சமூகம்",
            "CommunityDesc": "நிபுணர்களிடம் கேளுங்கள், வெற்றிக் கதைகளைப் பகிர்ந்து கொள்ளுங்கள், மற்றும் ஒரு பிரத்யேக வலைப்பின்னலில் அருகிலுள்ள விவசாயிகளுடன் இணையுங்கள்.",
            "Feed": "ஊட்டம்",
            "AskExpert": "நிபுணரிடம் கேளுங்கள்",
            "MyRequests": "எனது கோரிக்கைகள்",
            "PostPlaceholder": "உங்கள் பண்ணையில் என்ன நடக்கிறது? ஒரு கேள்வியைக் கேளுங்கள் அல்லது ஒரு புகைப்படத்தைப் பகிரவும்...",
            "AddPhoto": "புகைப்படம் சேர்",
            "PostUpdate": "புதுப்பிப்பை இடுகையிடவும்"
        }
    },
    te: {
        translation: {
            "Welcome": "రైతులకు పారదర్శక పంట ధరల నిర్ణయం",
            "CheckPrices": "మార్కెట్ ధరలను తనిఖీ చేయండి",
            "Dashboard": "డాష్‌బోర్డ్",
            "Prices": "ధరలను సరిపోల్చండి",
            "Profit": "లాభాల కాలిక్యులేటర్",
            "Trends": "మార్కెట్ పోకడలు",
            "Schemes": "ప్రభుత్వ పథకాలు",
            "Disease": "వ్యాధి స్కానర్",
            "Chat": "వాయిస్ అసిస్టెంట్",
            "Price": "ధర",
            "Crop": "పంట",
            "Market": "మార్కెట్",
            "Community": "సంఘం",
            "Marketplace": "మార్కెట్‌ప్లేస్",
            "Equipment": "పరికరాలు",
            "Loans": "రుణాలు",
            "Profile": "ప్రొఫైల్",
            "Applications": "అప్లికేషన్లు",
            "VoiceAssisted": "వాయిస్ సహాయక",
            "FarmersCommunity": "రైతుల సంఘం",
            "CommunityDesc": "నిపుణులను అడగండి, విజయ కథలను భాగస్వామ్యం చేయండి మరియు ప్రత్యేక నెట్‌వర్క్‌లో సమీపంలోని రైతులతో కనెక్ట్ అవ్వండి.",
            "Feed": "ఫీడ్",
            "AskExpert": "నిపుణుడిని అడగండి",
            "MyRequests": "నా అభ్యర్థనలు",
            "PostPlaceholder": "మీ పొలంలో ఏం జరుగుతోంది? ఒక ప్రశ్న అడగండి లేదా ఫోటోను పంచుకోండి...",
            "AddPhoto": "ఫోటోను జోడించండి",
            "PostUpdate": "నవీకరణను పోస్ట్ చేయండి"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
