import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import customTheme from "./theme";
import { WebSocketProvider } from "./providers/SocketProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </ChakraProvider>
  </React.StrictMode>
);
