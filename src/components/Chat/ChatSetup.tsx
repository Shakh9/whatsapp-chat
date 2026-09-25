import { useState } from 'react';

interface ChatSetupProps {
  onCreateChat: (phoneNumber: string) => void;
}

export function ChatSetup({ onCreateChat }: ChatSetupProps) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedPhoneNumber = phoneNumber.replace(/\D/g, '');

    if (normalizedPhoneNumber.length < 10) {
      return;
    }

    onCreateChat(normalizedPhoneNumber);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Новый чат</h1>

      <label>
        Номер телефона
        <input
          type="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          placeholder="79025503715"
        />
      </label>

      <button type="submit">Создать чат</button>
    </form>
  );
}
