import { useState } from 'react';
import { AuthForm } from './components/AuthForm/AuthForm';
import { getInstanceState } from './services/greenApi';
import { ChatSetup } from './components/Chat/ChatSetup';
import { Chat } from './components/Chat/Chat';
import './App.css';

const API_URL = 'https://7201.api.green-api.com';

function App() {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [chatId, setChatId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleConnect = async (newIdInstance: string, newApiTokenInstance: string) => {
    setIsLoading(true);
    setError('');
    try {
      const result = await getInstanceState({
        idInstance: newIdInstance,
        apiTokenInstance: newApiTokenInstance,
        apiUrl: API_URL,
      });
      if (result.stateInstance !== 'authorized') {
        setError('GREEN-API instance не авторизован');
        setIsConnected(false);
        return;
      }
      setIdInstance(newIdInstance);
      setApiTokenInstance(newApiTokenInstance);
      setIsConnected(true);
    } catch (error) {
      console.error(error);
      setError('Не удалось подключиться к GREEN-API');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCreateChat = (newPhoneNumber: string) => {
    const newChatId = `${newPhoneNumber}@c.us`;
    setPhoneNumber(newPhoneNumber);
    setChatId(newChatId);
  };
  if (!isConnected) {
    return (
      <main>
        {' '}
        <AuthForm onConnect={handleConnect} /> {isLoading && <p>Подключение...</p>} {error && <p>{error}</p>}{' '}
      </main>
    );
  }
  if (!chatId) {
    return (
      <main>
        {' '}
        <ChatSetup onCreateChat={handleCreateChat} />{' '}
      </main>
    );
  }
  return (
    <main>
      {' '}
      <Chat
        phoneNumber={phoneNumber}
        idInstance={idInstance}
        apiTokenInstance={apiTokenInstance}
        apiUrl={API_URL}
      />{' '}
    </main>
  );
}
export default App;
