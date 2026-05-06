import React from "react";
import { Toast } from "@/hooks/useToast";
import { cn } from "@/utils/classNames";

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

export const ToastComponent: React.FC<ToastProps> = ({ toast, onRemove }) => {
  return (
    <div
      className={cn(
        "flex items-center p-4 mb-4 text-sm rounded-lg shadow-lg",
        {
          "text-green-800 bg-green-50 border border-green-300": toast.type === "success",
          "text-red-800 bg-red-50 border border-red-300": toast.type === "error",
          "text-blue-800 bg-blue-50 border border-blue-300": toast.type === "info",
        }
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-1">{toast.message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
        onClick={() => onRemove(toast.id)}
        aria-label="Close notification"
      >
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-xs">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};