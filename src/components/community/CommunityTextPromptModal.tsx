import React from "react";
import { Pencil, X } from "lucide-react";

interface CommunityTextPromptModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  value: string;
  tagsValue: string;
  placeholder?: string;
  tagsPlaceholder?: string;
  submitLabel: string;
  isSubmitting?: boolean;
  onChange: (value: string) => void;
  onTagsChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
}

export const CommunityTextPromptModal: React.FC<CommunityTextPromptModalProps> = ({
  isOpen,
  title,
  description,
  value,
  tagsValue,
  placeholder,
  tagsPlaceholder = "#PantryToPlate, #HealthyDinner, #FoodCanvas",
  submitLabel,
  isSubmitting = false,
  onChange,
  onTagsChange,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="community-text-prompt-title"
      onClick={(event) => event.target === event.currentTarget && !isSubmitting && onClose()}
    >
      <form className="w-full max-w-lg rounded-3xl border border-emerald-900/70 bg-[#151916] p-6 text-white shadow-2xl shadow-black/40" onSubmit={(event) => { event.preventDefault(); void onSubmit(); }}>
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-[#2F8F46]/20 p-2.5 text-[#B7E35F]"><Pencil className="h-5 w-5" /></div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B7E35F]">Community editor</p>
            <h2 id="community-text-prompt-title" className="mt-1 text-xl font-black">{title}</h2>
            {description && <p className="mt-2 text-sm leading-6 text-neutral-300">{description}</p>}
          </div>
          <button type="button" onClick={onClose} disabled={isSubmitting} aria-label="Close editor" className="rounded-full p-1.5 text-neutral-400 transition hover:bg-white/10 hover:text-white disabled:opacity-50"><X className="h-4 w-4" /></button>
        </div>
        <label className="mt-6 block text-sm font-semibold text-neutral-200">
          Caption
          <textarea autoFocus value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={4} maxLength={3000} className="mt-2 w-full resize-none rounded-2xl border border-neutral-700 bg-[#0D100E] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-neutral-600 focus:border-[#2F8F46]" />
        </label>
        <label className="mt-5 block text-sm font-semibold text-neutral-200">
          Hashtags
          <input value={tagsValue} onChange={(event) => onTagsChange(event.target.value)} placeholder={tagsPlaceholder} maxLength={800} className="mt-2 w-full rounded-2xl border border-neutral-700 bg-[#0D100E] px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-[#2F8F46]" />
          <span className="mt-1.5 block text-xs font-normal text-neutral-500">Separate hashtags with commas or spaces. The # prefix is added automatically.</span>
        </label>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="rounded-xl px-4 py-2.5 text-sm font-bold text-neutral-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50">Cancel</button>
          <button type="submit" disabled={isSubmitting || !value.trim()} className="rounded-xl bg-[#2F8F46] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#176B35] disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? "Saving..." : submitLabel}</button>
        </div>
      </form>
    </div>
  );
};
