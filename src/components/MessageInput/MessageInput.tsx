import { useState } from 'react';

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    onSend(trimmedText);
    setText('');
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Напишите сообщение..."
        disabled={disabled}
      />

      <button type="submit" disabled={disabled}>
        ➤
      </button>
    </form>
  );
}
