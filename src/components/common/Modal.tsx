/* eslint-disable */
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import cn from "@/utils/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div
        className={cn(
          "fixed inset-10 z-50 overflow-auto rounded-lg bg-white p-6 shadow-xl md:inset-x-1/4 md:inset-y-20",
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <AiOutlineClose className="size-25 mt-10 mr-10" />
        </button>
        {title && (
          <h2 className="text-24-700 mb-6 mt-10 px-10">제목: {title}</h2>
        )}
        {children}
      </div>
    </>
  );
}
