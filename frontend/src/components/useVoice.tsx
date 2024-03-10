import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToText = () => {
    const { transcript, resetTranscript } = useSpeechRecognition();

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: false });
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
    };

    return (
        <div>
            <button onClick={startListening}>1 Start Listening</button>
            <button onClick={stopListening}>2 Stop Listening</button>
            <button onClick={resetTranscript}>3 Reset</button>
            <p>Transcript: {transcript}</p>
        </div>
    );
};

export default SpeechToText;
