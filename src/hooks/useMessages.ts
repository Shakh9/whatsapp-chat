import { useEffect } from 'react';
import { deleteNotification, receiveNotification } from '../services/greenApi';
import type { Message } from '../types/message';

interface UseMessagesParams {
  idInstance: string;
  apiTokenInstance: string;
  apiUrl: string;
  chatId: string;
  onMessage: (message: Message) => void;
}

export function useMessages({ idInstance, apiTokenInstance, apiUrl, chatId, onMessage }: UseMessagesParams) {
  useEffect(() => {
    let isActive = true;

    const pollMessages = async () => {
      while (isActive) {
        try {
          const notification = await receiveNotification({
            idInstance,
            apiTokenInstance,
            apiUrl,
          });

          if (!notification) {
            continue;
          }

          const { receiptId, body } = notification;

          if (body.typeWebhook !== 'incomingMessageReceived') {
            await deleteNotification({
              idInstance,
              apiTokenInstance,
              apiUrl,
              receiptId,
            });

            continue;
          }

          if (body.messageData.typeMessage !== 'textMessage') {
            await deleteNotification({
              idInstance,
              apiTokenInstance,
              apiUrl,
              receiptId,
            });

            continue;
          }

          if (body.senderData.chatId !== chatId) {
            await deleteNotification({
              idInstance,
              apiTokenInstance,
              apiUrl,
              receiptId,
            });

            continue;
          }

          const text = body.messageData.textMessageData?.textMessage;

          if (!text) {
            await deleteNotification({
              idInstance,
              apiTokenInstance,
              apiUrl,
              receiptId,
            });

            continue;
          }

          const message: Message = {
            id: body.idMessage,
            text,
            sender: 'other',
            timestamp: Date.now(),
          };

          onMessage(message);

          await deleteNotification({
            idInstance,
            apiTokenInstance,
            apiUrl,
            receiptId,
          });
        } catch (error) {
          console.error('Ошибка получения сообщения:', error);

          await new Promise((resolve) => {
            setTimeout(resolve, 3000);
          });
        }
      }
    };

    pollMessages();

    return () => {
      isActive = false;
    };
  }, [idInstance, apiTokenInstance, apiUrl, chatId, onMessage]);
}
