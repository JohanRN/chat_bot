import { useState, useMemo, useEffect, useRef } from "react";
import { App } from "../App";
import { ChatMessage } from "../components/ChatMessage";
import { Welcome } from "../components/Welcome";
import axios from 'axios';
import "../App.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone } from 'react-icons/fa';

export default function Index() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const messagesEndRef = useRef<any>(null);
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: false, language: 'es-ES' });
  };
  const [question, setQuestion] = useState<string>("");
  const [arrayQuestions, setArrayQuestions] = useState<string[]>([]);
  const [arrayResponse, setArrayResponse] = useState<any>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    inputRef.current?.focus();
  };
  async function postData() {
    try {
      const response = await axios.post('http://127.0.0.1:5000/generated/question');
      const text = response.data.answer;
      const questions = text.split('\n');
      setArrayQuestions(questions)
    } catch (error) {
      console.error(error);
    }
  }
  async function sendQuestion() {
    let bodyUser = {
      content: question,
      role: 'user'
    }
    let newArray = [...arrayResponse, bodyUser]
    let data = {
      question: question,
    }
    try {
      setQuestion("")
      const response = await axios.post('http://127.0.0.1:5000/question', data)
      if (response.status === 200) {
        const answer = response.data.answer
        let bodyAssistant = {
          content: answer,
          role: 'assistant'
        }
        newArray = [...newArray, bodyAssistant]
        setArrayResponse(newArray)
      }
    } catch (error: any) {
      let bodyAssistant = {
        content: "Error en el servidor, por favor intente más tarde.",
        role: 'assistant'
      }
      newArray = [...newArray, bodyAssistant]
      setArrayResponse(newArray)
    }

  }
  let audio: any;
  if (typeof window !== 'undefined') {
    audio = new Audio();
  }
  async function handleClick(param: any) {
    let boddy = {
      "text": param
    }
    const response = await axios.post('http://127.0.0.1:5000/audio', boddy, { responseType: 'arraybuffer' });
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'audio/mpeg' }));
    audio.src = url;
    audio.play();
  }

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
  }

  useEffect(() => {
    focusInput();
    postData();
    setArrayResponse([]);
  }, []);

  useEffect(() => {
    setQuestion(transcript)
  }, [transcript]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [arrayResponse]);
  return (
    <App title="Chat">
      <div className="background-image"></div>
      <main className="bg-white md:rounded-lg md:shadow-md p-6 w-full h-full flex flex-col">
        <section className="overflow-y-auto flex-grow mb-4 pb-8">
          <div className="flex flex-col space-y-4">
            <>
              <Welcome />
            </>
            {arrayResponse.map((response: any, index: any) => (
              <ChatMessage key={index} message={{ content: response.content, role: response.role }} onClick1={handleClick} onClick2={stopAudio} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </section>
        <div className="flex items-center justify-center ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 my-4">
            {arrayQuestions.map((question, index) => (
              <button onClick={(e) => setQuestion(question.split(".")[1].trimStart())} key={index} className="bg-gray-100 border-gray-300 border-2 rounded-lg p-4">
                <b>{question}</b>
              </button>
            ))}
          </div>
        </div>
        <section className="bg-gray-100 rounded-lg p-2">
          <div
            className="flex"
          >
            <button
              className="bg-gray-100 text-gray-600 px-2 rounded-l-lg"
              onClick={startListening}
            >
              <FaMicrophone color="#1d4ed8" />
            </button>
            <input
              type="text"
              ref={inputRef}
              value={question}
              className="w-full rounded-l-lg p-2 outline-none"
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              className="bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
              type="submit"
              onClick={() => sendQuestion()}
            >
              Enviar
            </button>
          </div>
        </section>
      </main>
    </App>
  );
}
