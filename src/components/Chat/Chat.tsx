import { useCallback, useState } from 'react';
import type { Message as MessageType } from '../../types/message';
import { sendMessage } from '../../services/greenApi';
import { ChatHeader } from '../ChatHeader/ChatHeader';
import { MessageInput } from '../MessageInput/MessageInput';
import { MessageList } from '../MessageList/MessageList';
import { useMessages } from '../../hooks/useMessages';

interface ChatProps {
  phoneNumber: string;
  chatId: string;
  idInstance: string;
  apiTokenInstance: string;
  apiUrl: string;
}

export function Chat({ phoneNumber, chatId, idInstance, apiTokenInstance, apiUrl }: ChatProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleIncomingMessage = useCallback((message: MessageType) => {
    setMessages((currentMessages) => [...currentMessages, message]);
  }, []);

  useMessages({
    idInstance,
    apiTokenInstance,
    apiUrl,
    chatId,
    onMessage: handleIncomingMessage,
  });

  const handleSend = useCallback(
    async (text: string) => {
      setIsSending(true);
      setError('');

      try {
        const result = await sendMessage({
          idInstance,
          apiTokenInstance,
          apiUrl,
          chatId,
          message: text,
        });

        const newMessage: MessageType = {
          id: result.idMessage,
          text,
          sender: 'me',
          timestamp: Date.now(),
        };

        setMessages((currentMessages) => [...currentMessages, newMessage]);
      } catch (error) {
        console.error(error);
        setError('Не удалось отправить сообщение');
      } finally {
        setIsSending(false);
      }
    },
    [idInstance, apiTokenInstance, apiUrl, chatId],
  );

  return (
    <section className="chat">
      {' '}
      <ChatHeader phoneNumber={phoneNumber} /> <MessageList messages={messages} />{' '}
      {error && <div className="chat-status chat-status--error"> {error} </div>}{' '}
      {isSending && <div className="chat-status"> Отправка... </div>}{' '}
      <MessageInput onSend={handleSend} disabled={isSending} />{' '}
    </section>
  );
}
