// App.tsx
import "./App.css";
import React, { useCallback, useEffect, useRef, useState } from "react";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    // connect to the server
    const ws = new WebSocket("ws://localhost:3000");
    wsRef.current = ws;

    ws.addEventListener("open", () => {
      console.log("Connected to WebSocket server");
    });

    // when receiving a message from the server
    ws.addEventListener("message", (event) => {
      const receivedMessage = event.data;
      console.log(`Received message: ${receivedMessage}`);

      setMessage(receivedMessage);
    });

    return () => {
      ws.close();
    };
  }, []);

  const submit: React.FormEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      wsRef.current?.send(input);
    },
    [input]
  );

  return (
    <div className="App">
      <h1>{JSON.stringify(message)}</h1>
      <form onSubmit={submit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button>Send</button>
      </form>
    </div>
  );
};

export default App;
