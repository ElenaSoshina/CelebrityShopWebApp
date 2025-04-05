// src/App.tsx - Main application component
import React, { useState } from 'react';
import './App.css';
const tg = (window as any).Telegram.WebApp;

function App() {
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async () => {
    setIsLoading(true);
    setError(null);

    const payload = {
      query_id: "1",
      chatId: tg.initDataUnsafe.user.id,
      text: "Vladimir"
    };

    try {
      const response = await fetch('https://easygo.duckdns.org/api/v1/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.text();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="App">
        <header className="App-header">
          <h1>Telegram Bot Mini-App</h1>
          <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="send-button"
          >
            {isLoading ? 'Sending...' : 'Send Message to Bot'}
          </button>

          {error && (
              <div className="error-message">
                {error}
              </div>
          )}

          {response && (
              <div className="response-container">
                <h3>Response:</h3>
                <p>{response}</p>
              </div>
          )}
        </header>
      </div>
  );
}

export default App;