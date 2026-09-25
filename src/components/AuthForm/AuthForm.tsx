import { useState } from 'react';

interface AuthFormProps {
  onConnect: (idInstance: string, apiTokenInstance: string) => void;
}

export function AuthForm({ onConnect }: AuthFormProps) {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onConnect(idInstance.trim(), apiTokenInstance.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>WhatsApp Chat</h1>
      <p>Подключение к GREEN-API</p>

      <label>
        ID Instance
        <input
          type="text"
          value={idInstance}
          onChange={(event) => setIdInstance(event.target.value)}
          placeholder="Введите ID Instance"
        />
      </label>

      <label>
        API Token Instance
        <input
          type="password"
          value={apiTokenInstance}
          onChange={(event) => setApiTokenInstance(event.target.value)}
          placeholder="Введите API Token Instance"
        />
      </label>

      <button type="submit">Подключиться</button>
    </form>
  );
}
