import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";

type Message = {
  command: string;
  sessionId: string;
  nickname: string;
  username: string;
  password: string;
  channel: string;
};

type WebSocketProviderProps = {
  children: ReactNode;
};

type WebSocketContextType = {
  messages: string[];
  sendMessage: (message: Message) => void;
};

const WebSocketContext = createContext<WebSocketContextType>({
  messages: [],
  sendMessage: () => {},
});

export const UseSocket = (): WebSocketContextType => useContext(WebSocketContext);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<string[]>([]);
  // keep the socket across re-renders
  const webSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    webSocketRef.current = new WebSocket("ws://localhost:3001/api/ws/");

    webSocketRef.current.onopen = () => console.log("WebSocket Connected");
    webSocketRef.current.onclose = () => console.log("WebSocket Disconnected");
    webSocketRef.current.onerror = (error) => console.error("WebSocket Error:", error);

    webSocketRef.current.onmessage = (event) => {
      const parsedMessage = JSON.parse(event.data);
      if (parsedMessage.type !== "points") {
        setMessages((prevMessages) => [parsedMessage, ...prevMessages]);
      }
    };

    return () => {
      webSocketRef.current?.close();
    };
  }, []);

  const sendMessage = (message: Message) => {
    if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
      webSocketRef.current.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return (
    <WebSocketContext.Provider value={{ messages, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
