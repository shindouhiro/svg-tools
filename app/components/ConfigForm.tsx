"use client";

import React from "react";
import { useLanguage } from "../utils/i18n";

interface ConfigFormProps {
  prefix: string;
  collectionName: string;
  useCurrentColor: boolean;
  onChange: (key: "prefix" | "collectionName", value: string) => void;
  onCurrentColorChange: (value: boolean) => void;
}

export default function ConfigForm({
  prefix,
  collectionName,
  useCurrentColor,
  onChange,
  onCurrentColorChange,
}: ConfigFormProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <div className="w-full">
          <label htmlFor="prefix" className="block text-xs font-semibold tracking-wider text-zinc-500 mb-2 uppercase">
            {t("prefixLabel")}
          </label>
          <input
            type="text"
            name="prefix"
            id="prefix"
            className="input font-mono uppercase"
            placeholder="e.g. icon"
            value={prefix}
            onChange={(e) => onChange("prefix", e.target.value)}
          />
          <p className="mt-2 text-xs text-zinc-600">
            {t("prefixDesc")}
          </p>
        </div>

        <div className="w-full">
          <label htmlFor="collectionName" className="block text-xs font-semibold tracking-wider text-zinc-500 mb-2 uppercase">
            {t("collectionLabel")}
          </label>
          <input
            type="text"
            name="collectionName"
            id="collectionName"
            className="input font-mono"
            placeholder="..."
            value={collectionName}
            onChange={(e) => onChange("collectionName", e.target.value)}
          />
          <p className="mt-2 text-xs text-zinc-600">
            {t("collectionDesc")}
          </p>
        </div>
      </div>

      {/* currentColor Toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-200">{t("useCurrentColorTitle")}</h3>
            <p className="text-xs text-zinc-500">
              {t("useCurrentColorDesc")}
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={useCurrentColor}
          onClick={() => onCurrentColorChange(!useCurrentColor)}
          className={`
            relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900
            ${useCurrentColor ? 'bg-indigo-500' : 'bg-zinc-700'}
          `}
        >
          <span className="sr-only">Use currentColor</span>
          <span
            aria-hidden="true"
            className={`
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
              transition duration-200 ease-in-out
              ${useCurrentColor ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
      </div>
    </div>
  );
}

