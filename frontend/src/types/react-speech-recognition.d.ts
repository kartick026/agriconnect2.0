declare module 'react-speech-recognition' {
    export interface SpeechRecognitionOptions {
        continuous?: boolean;
        language?: string;
    }

    export interface UseSpeechRecognitionOptions {
        transcribing?: boolean;
        clearTranscriptOnListen?: boolean;
        commands?: any[];
    }

    export interface SpeechRecognitionState {
        transcript: string;
        interimTranscript: string;
        finalTranscript: string;
        listening: boolean;
        resetTranscript: () => void;
        browserSupportsSpeechRecognition: boolean;
        isMicrophoneAvailable: boolean;
    }

    export function useSpeechRecognition(options?: UseSpeechRecognitionOptions): SpeechRecognitionState;

    const SpeechRecognition: {
        startListening: (options?: SpeechRecognitionOptions) => Promise<void>;
        stopListening: () => Promise<void>;
        abortListening: () => Promise<void>;
        browserSupportsSpeechRecognition: () => boolean;
        applyPolyfill: (SpeechRecognitionPolyfill: any) => void;
    };

    export default SpeechRecognition;
}
