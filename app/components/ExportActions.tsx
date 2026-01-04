"use client";

import React from "react";

interface ExportActionsProps {
  onExport: () => void;
  disabled?: boolean;
  count: number;
}

export default function ExportActions({
  onExport,
  disabled = false,
  count,
}: ExportActionsProps) {
  return (
    <div className="flex w-full justify-end pt-4">
      <button
        onClick={onExport}
        disabled={disabled}
        className={`
          relative overflow-hidden rounded-xl px-8 py-4 text-sm font-bold tracking-widest transition-all duration-300
          ${disabled
            ? "cursor-not-allowed bg-zinc-800 text-zinc-600"
            : "btn-primary shadow-lg shadow-indigo-500/20"
          }
        `}
      >
        <span className="relative z-10 flex items-center gap-2">
          GENERATE JSON {count > 0 && `(${count})`}
          {!disabled && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
