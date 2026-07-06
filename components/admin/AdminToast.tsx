"use client";

import { createContext, useContext, useState } from "react";

type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
  id: number;
  type: ToastType;
  title: string;
  message?: string;
};

type ToastContextType = {
  showToast: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useAdminToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useAdminToast must be used inside AdminToastProvider");
  }

  return context;
}

export default function AdminToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { ...toast, id }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="admin-toast-wrap">
        {toasts.map((toast) => (
          <div className={`admin-toast ${toast.type}`} key={toast.id}>
            <button
              className="admin-toast-close"
              onClick={() =>
                setToasts((prev) => prev.filter((item) => item.id !== toast.id))
              }
            >
              ×
            </button>

            <div className="admin-toast-icon">
              {toast.type === "success" && "✓"}
              {toast.type === "error" && "!"}
              {toast.type === "warning" && "!"}
              {toast.type === "info" && "i"}
            </div>

            <div>
              <strong>{toast.title}</strong>
              {toast.message && <p>{toast.message}</p>}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}