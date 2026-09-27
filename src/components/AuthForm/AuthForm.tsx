import { useState } from 'react';

interface AuthFormProps {
  onConnect: (idInstance: string, apiTokenInstance: string) => void;
  isLoading: boolean;
  error: string;
}

export function AuthForm({ onConnect, isLoading, error }: AuthFormProps) {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedIdInstance = idInstance.trim();
    const trimmedApiTokenInstance = apiTokenInstance.trim();

    if (!trimmedIdInstance || !trimmedApiTokenInstance) {
      return;
    }

    onConnect(trimmedIdInstance, trimmedApiTokenInstance);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>WhatsApp Chat</h1>

      <p className="auth-form__description">Подключение к GREEN-API</p>

      <label>
        ID Instance
        <input
          type="text"
          value={idInstance}
          onChange={(event) => setIdInstance(event.target.value)}
          placeholder="Введите ID Instance"
          disabled={isLoading}
          required
        />
      </label>

      <label>
        API Token Instance
        <input
          type="password"
          value={apiTokenInstance}
          onChange={(event) => setApiTokenInstance(event.target.value)}
          placeholder="Введите API Token Instance"
          disabled={isLoading}
          required
        />
      </label>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={isLoading || !idInstance.trim() || !apiTokenInstance.trim()}>
        {isLoading ? 'Подключение...' : 'Подключиться'}
      </button>
    </form>
  );
}
