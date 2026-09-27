import { useState } from 'react';

interface ChatSetupProps {
  onCreateChat: (phoneNumber: string) => void;
}

export function ChatSetup({ onCreateChat }: ChatSetupProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedPhoneNumber = phoneNumber.replace(/\D/g, '');

    if (normalizedPhoneNumber.length < 10) {
      setError('Введите корректный номер телефона');
      return;
    }

    setError('');
    onCreateChat(normalizedPhoneNumber);
  };

  return (
    <form className="chat-setup" onSubmit={handleSubmit}>
      <h1>Новый чат</h1>

      <p className="chat-setup__description">Введите номер телефона получателя</p>

      <label>
        Номер телефона
        <input
          type="tel"
          value={phoneNumber}
          onChange={(event) => {
            setPhoneNumber(event.target.value);
            setError('');
          }}
          placeholder="78005553535"
          required
        />
      </label>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit">Создать чат</button>
    </form>
  );
}
