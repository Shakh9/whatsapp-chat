export interface GreenApiNotification {
  receiptId: number;
  body: {
    typeWebhook: string;
    idMessage: string;
    senderData: {
      chatId: string;
      sender: string;
      senderName: string;
      senderContactName: string;
      chatName: string;
    };
    messageData: {
      typeMessage: string;
      textMessageData?: {
        textMessage: string;
      };
    };
  };
}
