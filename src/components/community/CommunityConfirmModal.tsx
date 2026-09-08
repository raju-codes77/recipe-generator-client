import React from "react";
import { AlertTriangle, LoaderCircle, X } from "lucide-react";

interface CommunityConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export const CommunityConfirmModal: React.FC<CommunityConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel,
  isLoading = false,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="community-confirm-title"
      onClick={(event) => event.target === event.currentTarget && !isLoading && onClose()}
    >
      <div className="w-full max-w-sm rounded-3xl border border-rose-500/25 bg-[#151916] p-6 text-white shadow-2xl shadow-black/40">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-rose-500/15 p-2.5 text-rose-300">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 id="community-confirm-title" className="text-lg font-black">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-300">{message}</p>
          </div>
          <button type="button" onClick={onClose} disabled={isLoading} aria-label="Close confirmation" className="rounded-full p-1.5 text-neutral-400 transition hover:bg-white/10 hover:text-white disabled:opacity-50">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={isLoading} className="rounded-xl border border-neutral-700 px-4 py-2.5 text-sm font-bold text-neutral-200 transition hover:border-neutral-500 hover:bg-white/5 disabled:opacity-50">Cancel</button>
          <button type="button" onClick={() => void onConfirm()} disabled={isLoading} className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-rose-600 disabled:cursor-wait disabled:opacity-60">
            {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {isLoading ? "Working..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
