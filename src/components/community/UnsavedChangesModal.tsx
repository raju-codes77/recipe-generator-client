import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface UnsavedChangesModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onKeepEditing: () => void;
  onDiscard: () => void;
}

export const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({
  isOpen,
  title,
  message,
  onKeepEditing,
  onDiscard,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="unsaved-changes-title"
      onClick={(event) => event.target === event.currentTarget && onKeepEditing()}
    >
      <div className="w-full max-w-sm rounded-3xl border border-emerald-900/70 bg-[#151916] p-6 text-white shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-amber-500/15 p-2.5 text-amber-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 id="unsaved-changes-title" className="text-lg font-black">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-300">{message}</p>
          </div>
          <button type="button" onClick={onKeepEditing} aria-label="Keep editing" className="rounded-full p-1.5 text-neutral-400 transition hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onKeepEditing} className="rounded-xl border border-neutral-700 px-4 py-2.5 text-sm font-bold text-neutral-200 transition hover:border-neutral-500 hover:bg-white/5">No</button>
          <button type="button" onClick={onDiscard} className="rounded-xl bg-[#2F8F46] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#176B35]">Yes</button>
        </div>
      </div>
    </div>
  );
};
