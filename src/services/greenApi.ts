import type { GreenApiNotification } from '../types/greenApi';

interface GreenApiConfig {
  idInstance: string;
  apiTokenInstance: string;
  apiUrl: string;
}

interface GreenApiStateResponse {
  stateInstance: string;
}

interface SendMessageResponse {
  idMessage: string;
}

interface SendMessageParams {
  idInstance: string;
  apiTokenInstance: string;
  apiUrl: string;
  chatId: string;
  message: string;
}

export async function getInstanceState({
  idInstance,
  apiTokenInstance,
  apiUrl,
}: GreenApiConfig): Promise<GreenApiStateResponse> {
  const response = await fetch(`${apiUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`);

  if (!response.ok) {
    throw new Error('Не удалось получить состояние GREEN-API');
  }

  return response.json();
}

export async function sendMessage({
  idInstance,
  apiTokenInstance,
  apiUrl,
  chatId,
  message,
}: SendMessageParams): Promise<SendMessageResponse> {
  const response = await fetch(`${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatId,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error('Не удалось отправить сообщение');
  }

  return response.json();
}

export async function receiveNotification({
  idInstance,
  apiTokenInstance,
  apiUrl,
}: GreenApiConfig): Promise<GreenApiNotification | null> {
  const response = await fetch(`${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);

  if (!response.ok) {
    throw new Error('Не удалось получить уведомление');
  }

  const data = await response.json();

  if (!data) {
    return null;
  }

  return data;
}

export async function deleteNotification({
  idInstance,
  apiTokenInstance,
  apiUrl,
  receiptId,
}: GreenApiConfig & { receiptId: number }): Promise<void> {
  const response = await fetch(
    `${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    {
      method: 'DELETE',
    },
  );

  if (!response.ok) {
    throw new Error('Не удалось удалить уведомление');
  }
}
