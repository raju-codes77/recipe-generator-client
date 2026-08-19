"use client";

import { useRef, useState, type DragEvent } from "react";
import { CloudUpload, Camera, Clipboard, Upload, Leaf, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

interface UploadCardProps {
  onFileSelected: (file: File) => void;
  isBusy: boolean;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 10;

export default function UploadCard({ onFileSelected, isBusy }: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function validateAndSend(file: File) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Use a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Image must be under ${MAX_SIZE_MB}MB.`);
      return;
    }
    onFileSelected(file);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSend(file);
  }

  async function handlePaste() {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const type = item.types.find((t) => t.startsWith("image/"));
        if (type) {
          const blob = await item.getType(type);
          validateAndSend(new File([blob], "pasted-image", { type }));
          return;
        }
      }
      toast.error("No image found on clipboard.");
    } catch {
      toast.error("Couldn't read clipboard. Paste isn't supported in this browser.");
    }
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950">
            <Leaf className="h-[18px] w-[18px] text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-50">
              Nutrition analyzer
            </h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Upload a food photo and let AI analyze its nutritional value and health insights.
            </p>
          </div>
        </div>

        <div className="hidden min-w-[220px] items-start gap-2 rounded-lg bg-emerald-50 p-3 sm:flex dark:bg-emerald-950">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
              AI-powered analysis
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-emerald-700 dark:text-emerald-400">
              Our AI identifies ingredients and calculates nutrition facts with high accuracy.
            </p>
          </div>
        </div>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center gap-2 rounded-xl border-[1.5px] border-dashed px-6 py-12 transition-colors ${
          isDragging
            ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
      >
        <div className="flex h-13 w-13 items-center justify-center rounded-full bg-emerald-50 p-3 dark:bg-emerald-950">
          <CloudUpload className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-50">
          Upload food photo
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Drag and drop your image here
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500">or</p>

        <button
          type="button"
          disabled={isBusy}
          onClick={() => inputRef.current?.click()}
          className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition active:scale-[0.98] disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900"
        >
          <Upload className="h-3.5 w-3.5" />
          Choose image
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) validateAndSend(file);
            e.target.value = "";
          }}
        />
        <p className="mt-2 text-[11px] text-neutral-400 dark:text-neutral-500">
          Supports JPG, PNG, WebP (max {MAX_SIZE_MB}MB)
        </p>

        <div className="my-3 flex w-52 items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
          <span className="text-[11px] text-neutral-400">or</span>
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={isBusy}
            onClick={() => toast("Camera capture isn't wired up yet.")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <Camera className="h-3.5 w-3.5" />
            Take photo
          </button>
          <button
            type="button"
            disabled={isBusy}
            onClick={handlePaste}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <Clipboard className="h-3.5 w-3.5" />
            Paste image
          </button>
        </div>
      </div>
    </div>
  );
}