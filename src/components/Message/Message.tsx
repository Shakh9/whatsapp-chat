import type { Message as MessageType } from '../../types/message';

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  return (
    <div className={`message message--${message.sender}`}>
      <div className="message__bubble">
        <p>{message.text}</p>

        <span>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}
