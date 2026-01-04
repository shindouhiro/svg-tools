"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react"; // Assuming we can use Icon here too if needed, or SVG
import FileUploader from "./components/FileUploader";
import IconPreview from "./components/IconPreview";
import ConfigForm from "./components/ConfigForm";
import ExportActions from "./components/ExportActions";
import {
  ParsedSVG,
  parseSVG,
  readFileAsText,
  generateIconifyJSON,
  downloadJSON,
} from "./utils/iconify";

export default function Home() {
  const [icons, setIcons] = useState<ParsedSVG[]>([]);
  const [prefix, setPrefix] = useState("icon");
  const [collectionName, setCollectionName] = useState("");

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

  const handleExport = useCallback(() => {
    if (icons.length === 0) return;
    const json = generateIconifyJSON(icons, prefix || "icon", collectionName);
    downloadJSON(json, collectionName || "icons");
  }, [icons, prefix, collectionName]);

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
              <h1 className="text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl gradient-text">
                SVG TO
                <br />
                ICONIFY
              </h1>
              <p className="max-w-2xl text-lg font-light text-zinc-400">
                Transform raw SVG files into a unified Iconify JSON collection.
                <br />
                Ready for modern web development.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/demo" className="btn-secondary group">
                <svg className="w-5 h-5 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Live Demo
              </Link>
              <Link href="/intellisense" className="btn-secondary group">
                <Icon icon="logos:visual-studio-code" width={20} className="grayscale group-hover:grayscale-0 transition-all" />
                IntelliSense 配置
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
                Upload Files
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
                Configuration
              </span>
            </div>
            <div className="card p-6 md:p-8 hover:border-purple-500/30 transition-colors">
              <ConfigForm
                prefix={prefix}
                collectionName={collectionName}
                onChange={handleConfigChange}
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
                  Review & Export
                </span>
              </div>
              <div className="card p-6 md:p-8 hover:border-emerald-500/30 transition-colors">
                <IconPreview icons={icons} onRemove={handleRemove} />
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
          <p>© {new Date().getFullYear()} SVG to Iconify Converter. Built for developers.</p>
        </footer>
      </div>
    </main>
  );
}
