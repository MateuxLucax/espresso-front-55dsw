import React, { useState, useEffect } from "react";

interface ErrorToastProps {
  title?: string;
  message: string;
  timeout?: number;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message, title, timeout }) => {
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
      className={`fixed bottom-4 right-4 bg-red-500 p-4 shadow-md transition-opacity duration-500 ease-in-outease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col">
        {title && <p className="text-sm font-semibold text-white">{title}</p>}
        <p className="text-xs text-gray-50">{message}</p>
      </div>
    </div>
  );
};

export default ErrorToast;
