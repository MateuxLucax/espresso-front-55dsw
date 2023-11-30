import { useState, useEffect } from "react";

interface ErrorToastProps {
  title?: string;
  message: string;
  timeout?: number;
}

export default function ErrorToast({
  message,
  title,
  timeout,
}: ErrorToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, timeout || 1000 * 5);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout]);

  return (
    <div
      className={`max-w-sm fixed bottom-4 right-4 bg-red-500 p-4 shadow-md transition-opacity duration-500 ease-in-outease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col">
        {title && <p className="text-sm font-bold text-white">{title}</p>}
        <p className="text-xs font-semibold text-gray-50">{message}</p>
      </div>
    </div>
  );
}
