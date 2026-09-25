import type { Message as MessageType } from '../../types/message';
import { Message } from '../Message/Message';

interface MessageListProps {
  messages: MessageType[];
}

export function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="message-list message-list--empty">
        <p>Нет сообщений. Напишите первым!</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}
