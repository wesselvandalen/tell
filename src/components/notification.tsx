import { useEffect, useState } from "react";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export default function Notification({ message, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 4000); // Notification disappears after 4 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-50 text-black px-4 py-2 rounded-lg shadow-lg text-sm sm:text-base z-50 animate-fade-in-out">
      {message}
    </div>
  );
}