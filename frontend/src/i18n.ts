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
            "Market": "Market"
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
            "Market": "बाज़ार"
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
            "Market": "बाजार"
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
            "Market": "ਮੰਡੀ"
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
            "Market": "சந்தை"
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
            "Market": "మార్కెట్"
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
