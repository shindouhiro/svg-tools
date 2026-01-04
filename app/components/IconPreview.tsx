"use client";

import React from "react";
import { ParsedSVG } from "../utils/iconify";

interface IconPreviewProps {
  icons: ParsedSVG[];
  onRemove: (name: string) => void;
}

export default function IconPreview({ icons, onRemove }: IconPreviewProps) {
  if (icons.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <h2 className="text-sm font-semibold tracking-wider text-zinc-200">
          PREVIEW <span className="text-zinc-500">({icons.length})</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {icons.map((icon) => (
          <div
            key={icon.name}
            className="group relative flex aspect-square flex-col items-center justify-center rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-4 transition-all hover:bg-zinc-700/50 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <button
              onClick={() => onRemove(icon.name)}
              className="absolute right-2 top-2 z-10 hidden rounded-full bg-zinc-900 p-1 text-zinc-400 shadow-sm hover:text-red-500 group-hover:block transition-colors"
              aria-label={`Remove ${icon.name}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>

            <div className="flex flex-1 items-center justify-center text-white">
              <svg
                viewBox={`0 0 ${icon.width} ${icon.height}`}
                width="32"
                height="32"
                fill="currentColor"
                dangerouslySetInnerHTML={{ __html: icon.body }}
              />
            </div>

            <div className="mt-3 w-full truncate text-center text-[10px] font-medium uppercase tracking-wide text-zinc-500 group-hover:text-zinc-300">
              {icon.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
