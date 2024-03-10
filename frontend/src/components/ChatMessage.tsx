import React, { useState } from 'react';
import {
  FunctionComponent,
  DetailedHTMLProps,
  TableHTMLAttributes,
} from "react";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import remarkGfm from "remark-gfm";
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
interface Props {
  message: ChatMessage;
  onClick1: (param: any) => void;
  onClick2: () => void;
}

// This lets us style any markdown tables that are rendered
const CustomTable: FunctionComponent<
  Omit<
    DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>,
    "ref"
  > &
  ReactMarkdownProps
> = ({ children, ...props }) => {
  return (
    <div className="overflow-x-auto">
      <table {...props} className="w-full text-left border-collapse table-auto">
        {children}
      </table>
    </div>
  );
};

export const ChatMessage: React.FC<React.PropsWithChildren<Props>> = ({
  message, onClick1, onClick2
}) => {
  const [isMuted, setIsMuted] = useState(false);

  return message.role === "user" ? (
    <div className="flex items-end justify-end">
      <div className="bg-gray-300 border-gray-100 border-2 rounded-lg p-2 max-w-lg">
        <p>{message.content}</p>
      </div>
    </div>
  ) : (
    <div className="flex items-end">
      <div className="bg-gray-100 border-gray-300 border-2 rounded-lg p-2 mr-20 w-full">
        <ReactMarkdown
          children={message.content}
          remarkPlugins={[remarkGfm]}
          components={{
            table: CustomTable,
          }}
        />
        <div style={{ marginTop: "10px", display: "flex", flexDirection: "row" }}>
          {isMuted ? (
            <FaVolumeMute color="#1d4ed8" onClick={() => { setIsMuted(false); onClick2(); }} />
          ) : (
            <FaVolumeUp color="#1d4ed8" onClick={() => { setIsMuted(true); onClick1(message.content); }} />
          )}
        </div>
      </div>
    </div>
  );
};