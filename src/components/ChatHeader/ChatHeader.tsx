interface ChatHeaderProps {
  phoneNumber: string;
}

export function ChatHeader({ phoneNumber }: ChatHeaderProps) {
  return (
    <header className="chat-header">
      <div>
        <h2>{phoneNumber}</h2>
        <span>WhatsApp</span>
      </div>
    </header>
  );
}
