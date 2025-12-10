import { useEffect } from "react";
import Button from "./Button";

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
      style={{ animation: "fade-in 0.3s ease-out" }}
    >
      <div
        className={`glass-strong rounded-xl ${sizes[size]} w-full max-w-[calc(100vw-1rem)] my-2 animate-scale-in flex flex-col max-h-[calc(100vh-1rem)]`}
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "scale-in 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/20 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-white text-gray-600 dark:text-white hover:text-white transition-colors text-xl sm:text-2xl leading-none p-1"
          >
            ×
          </button>
        </div>
        <div className="p-3 sm:p-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
