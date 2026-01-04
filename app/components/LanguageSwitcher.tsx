"use client";

import React from "react";
import { useLanguage } from "../utils/i18n";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-zinc-800/50 p-1 rounded-lg border border-zinc-700/50">
      <button
        onClick={() => setLanguage("zh")}
        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${language === "zh"
            ? "bg-indigo-500 text-white shadow-lg"
            : "text-zinc-500 hover:text-zinc-300"
          }`}
      >
        中文
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${language === "en"
            ? "bg-indigo-500 text-white shadow-lg"
            : "text-zinc-500 hover:text-zinc-300"
          }`}
      >
        EN
      </button>
    </div>
  );
}
