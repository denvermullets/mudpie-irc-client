import { useState } from "react";
import "./App.css";
import { Box, Button, Input } from "@chakra-ui/react";
import { UseSocket } from "./providers/SocketProvider";

function App() {
  const [userMessage, setUserMessage] = useState<string>("");
  const { sendMessage } = UseSocket();

  const message = {
    command: "connect",
    sessionId: "sessionId1",
    nickname: "nickname1",
    username: "guest234343",
    password: "xyz",
    channel: "atpr",
  };

  return (
    <Box>
      <Input
        background="white"
        onChange={(e) => setUserMessage(e.target.value)}
        value={userMessage}
      />
      <Button width="100%" marginTop={2} onClick={() => sendMessage(message)}>
        Send Message
      </Button>
    </Box>
  );
}

export default App;
