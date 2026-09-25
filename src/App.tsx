import { useState } from 'react';
import { AuthForm } from './components/AuthForm/AuthForm';
import { getInstanceState } from './services/greenApi';
import { ChatSetup } from './components/Chat/ChatSetup';

const API_URL = 'https://7201.api.green-api.com';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [chatId, setChatId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = async (idInstance: string, apiTokenInstance: string) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await getInstanceState({
        idInstance,
        apiTokenInstance,
        apiUrl: API_URL,
      });

      console.log('GREEN-API state:', result);

      setIsConnected(result.stateInstance === 'authorized');
    } catch (error) {
      console.error(error);
      setError('Не удалось подключиться к GREEN-API');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateChat = (phoneNumber: string) => {
    const newChatId = `${phoneNumber}@c.us`;

    setChatId(newChatId);

    console.log('Created chat:', newChatId);
  };

  if (!isConnected) {
    return (
      <main>
        <AuthForm onConnect={handleConnect} />

        {isLoading && <p>Подключение...</p>}

        {error && <p>{error}</p>}
      </main>
    );
  }

  if (!chatId) {
    return (
      <main>
        <ChatSetup onCreateChat={handleCreateChat} />
      </main>
    );
  }

  return (
    <main>
      <h1>Чат создан ✅</h1>
      <p>Chat ID: {chatId}</p>
    </main>
  );
}

export default App;
