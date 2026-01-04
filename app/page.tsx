"use client";

import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import FileUploader from "./components/FileUploader";
import IconPreview from "./components/IconPreview";
import ConfigForm from "./components/ConfigForm";
import ExportActions from "./components/ExportActions";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useLanguage } from "./utils/i18n";
import {
  ParsedSVG,
  parseSVG,
  readFileAsText,
  generateIconifyJSON,
  downloadJSON,
  replaceColorsWithCurrentColor,
} from "./utils/iconify";

export default function Home() {
  const { t, language } = useLanguage();
  const [icons, setIcons] = useState<ParsedSVG[]>([]);
  const [prefix, setPrefix] = useState("icon");
  const [collectionName, setCollectionName] = useState("");
  const [useCurrentColor, setUseCurrentColor] = useState(true);
  const [showJsonPreview, setShowJsonPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    const newIcons: ParsedSVG[] = [];

    for (const file of files) {
      try {
        const content = await readFileAsText(file);
        const parsed = parseSVG(content, file.name);
        if (parsed) {
          newIcons.push({ ...parsed, file });
        }
      } catch (error) {
        console.error("Failed to read file:", file.name, error);
      }
    }

    setIcons((prev) => {
      const existingNames = new Set(prev.map((i) => i.name));
      const uniqueNewIcons = newIcons.filter((i) => !existingNames.has(i.name));
      return [...prev, ...uniqueNewIcons];
    });
  }, []);

  const handleRemove = useCallback((name: string) => {
    setIcons((prev) => prev.filter((i) => i.name !== name));
  }, []);

  const handleConfigChange = useCallback(
    (key: "prefix" | "collectionName", value: string) => {
      if (key === "prefix") setPrefix(value);
      if (key === "collectionName") setCollectionName(value);
    },
    []
  );

  // 生成预览用的 JSON
  const generatedJson = useMemo(() => {
    if (icons.length === 0) return null;

    const processedIcons = useCurrentColor
      ? icons.map((icon) => ({
        ...icon,
        body: replaceColorsWithCurrentColor(icon.body),
      }))
      : icons;

    return generateIconifyJSON(processedIcons, prefix || "icon", collectionName);
  }, [icons, prefix, collectionName, useCurrentColor]);

  const jsonString = useMemo(() => {
    if (!generatedJson) return "";
    return JSON.stringify(generatedJson, null, 2);
  }, [generatedJson]);

  const handleExport = useCallback(() => {
    if (!generatedJson) return;
    downloadJSON(generatedJson, collectionName || "icons");
  }, [generatedJson, collectionName]);

  const handleCopyJson = useCallback(async () => {
    if (!jsonString) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(jsonString);
        setCopied(true);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = jsonString;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
        } catch (err) {
          console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textArea);
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }, [jsonString]);

  return (
    <main className="min-h-screen w-full bg-[var(--background)] px-6 py-12 text-[var(--foreground)] md:px-12 lg:px-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-5xl space-y-16">
        <header className="space-y-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-4 mb-2">
                <LanguageSwitcher />
              </div>
              <h1 className="text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl gradient-text uppercase">
                {t("title")}
              </h1>
              <p className="max-w-2xl text-lg font-light text-zinc-400">
                {t("subtitle")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/demo" className="btn-secondary group">
                <svg className="w-5 h-5 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t("liveDemo")}
              </Link>
              <Link href="/intellisense" className="btn-secondary group">
                <Icon icon="logos:visual-studio-code" width={20} className="grayscale group-hover:grayscale-0 transition-all" />
                {t("intellisenseConfig")}
              </Link>
            </div>
          </div>
        </header>

        <div className="space-y-8">
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 px-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-bold text-indigo-400 border border-indigo-500/20">
                01
              </span>
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                {t("step1")}
              </span>
            </div>
            <div className="card p-2 md:p-8 hover:border-indigo-500/30 transition-colors">
              <FileUploader onFilesSelected={handleFilesSelected} />
            </div>
          </section>

          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <div className="flex items-center gap-3 px-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/10 text-xs font-bold text-purple-400 border border-purple-500/20">
                02
              </span>
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                {t("step2")}
              </span>
            </div>
            <div className="card p-6 md:p-8 hover:border-purple-500/30 transition-colors">
              <ConfigForm
                prefix={prefix}
                collectionName={collectionName}
                useCurrentColor={useCurrentColor}
                onChange={handleConfigChange}
                onCurrentColorChange={setUseCurrentColor}
              />
            </div>
          </section>

          {icons.length > 0 && (
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <div className="flex items-center gap-3 px-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  03
                </span>
                <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                  {t("step3")}
                </span>
              </div>
              <div className="card p-6 md:p-8 hover:border-emerald-500/30 transition-colors space-y-6">
                <IconPreview icons={icons} onRemove={handleRemove} />

                {/* JSON Preview Toggle */}
                <div className="border-t border-zinc-800 pt-6">
                  <button
                    onClick={() => setShowJsonPreview(!showJsonPreview)}
                    className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${showJsonPreview ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="font-medium">{t("previewJson")}</span>
                    <span className="text-xs text-zinc-600">({jsonString.length} {language === 'zh' ? '字符' : 'chars'})</span>
                  </button>

                  {showJsonPreview && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="relative">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 rounded-t-lg border border-zinc-700 border-b-0">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            <span className="text-xs font-medium text-zinc-400">
                              {collectionName || "icons"}.json
                            </span>
                          </div>
                          <button
                            onClick={handleCopyJson}
                            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded transition-colors"
                          >
                            {copied ? (
                              <>
                                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {t("copied")}
                              </>
                            ) : (
                              <>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                {t("copy")}
                              </>
                            )}
                          </button>
                        </div>

                        {/* Code Block */}
                        <div className="code-preview rounded-t-none max-h-[400px] overflow-auto border border-zinc-700">
                          <pre className="text-sm text-emerald-400 leading-relaxed">
                            {jsonString}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <ExportActions
                  onExport={handleExport}
                  disabled={icons.length === 0}
                  count={icons.length}
                />
              </div>
            </section>
          )}
        </div>

        <footer className="pt-12 text-center text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} {t("footer")}</p>
        </footer>
      </div>

      {/* Toast 通知 */}
      {copied && (
        <div className="toast success flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{t("codeCopied")}</span>
        </div>
      )}
    </main>
  );
}
