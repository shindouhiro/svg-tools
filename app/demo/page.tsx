'use client';

import { useState, useMemo } from 'react';
import { addCollection, Icon } from '@iconify/react';
import Link from 'next/link';
import iconsData from '../utils/icons.json';
import { useLanguage } from '../utils/i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';

// 注册自定义图标集合
addCollection(iconsData as any);

export default function DemoPage() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [iconSize, setIconSize] = useState(48);
  const [iconColor, setIconColor] = useState('#6366f1');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // 获取所有图标名称
  const iconNames = useMemo(() => {
    return Object.keys(iconsData.icons);
  }, []);

  // 过滤图标
  const filteredIcons = useMemo(() => {
    if (!searchTerm) return iconNames;
    return iconNames.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [iconNames, searchTerm]);

  // 复制图标使用代码
  const copyIconCode = (name: string) => {
    const code = `<Icon icon="${iconsData.prefix}:${name}" />`;
    navigator.clipboard.writeText(code);
    setCopiedIcon(name);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  // 下载 SVG
  const downloadSvg = (name: string) => {
    const iconData = iconsData.icons[name as keyof typeof iconsData.icons];
    const width = (iconData as { width?: number }).width || iconsData.width;
    const height = (iconData as { height?: number }).height || iconsData.height;
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${iconData.body}</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex justify-between items-start mb-8">
            <Link href="/" className="btn-secondary flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t("back")}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* 标题区域 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-indigo-300">
                {t("demoTitle")}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="gradient-text">{iconsData.prefix}</span>
              <span className="text-white/90"> Icons</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              {t("demoDesc")}
            </p>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="stats-card group hover:scale-105 transition-transform">
              <div className="stats-value">{iconNames.length}</div>
              <div className="text-zinc-400 text-sm uppercase">{t("totalIcons")}</div>
            </div>
            <div className="stats-card group hover:scale-105 transition-transform">
              <div className="stats-value">{iconsData.width}</div>
              <div className="text-zinc-400 text-sm uppercase">{t("defaultWidth")}</div>
            </div>
            <div className="stats-card group hover:scale-105 transition-transform">
              <div className="stats-value">{iconsData.height}</div>
              <div className="text-zinc-400 text-sm uppercase">{t("defaultHeight")}</div>
            </div>
            <div className="stats-card group hover:scale-105 transition-transform">
              <div className="stats-value text-2xl">{iconsData.prefix}</div>
              <div className="text-zinc-400 text-sm uppercase">{t("prefixName")}</div>
            </div>
          </div>

          {/* 搜索和控制区 */}
          <div className="card p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* 搜索框 */}
              <div className="relative flex-1 w-full">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder={t("searchIcons")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-12 w-full"
                />
              </div>

              {/* 尺寸控制 */}
              <div className="flex items-center gap-3">
                <label className="text-sm text-zinc-400 whitespace-nowrap">{t("iconSize")}:</label>
                <input
                  type="range"
                  min="24"
                  max="96"
                  value={iconSize}
                  onChange={(e) => setIconSize(Number(e.target.value))}
                  className="w-24 accent-indigo-500"
                />
                <span className="text-sm text-zinc-300 w-12">{iconSize}px</span>
              </div>

              {/* 颜色选择 */}
              <div className="flex items-center gap-3">
                <label className="text-sm text-zinc-400 whitespace-nowrap">{t("iconColor")}:</label>
                <input
                  type="color"
                  value={iconColor}
                  onChange={(e) => setIconColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* 图标网格 */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white uppercase">
                {t("iconList")}
                <span className="ml-2 text-sm font-normal text-zinc-500">
                  ({filteredIcons.length})
                </span>
              </h2>
            </div>

            {filteredIcons.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {filteredIcons.map((name, index) => (
                  <div
                    key={name}
                    className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-indigo-500/50 hover:bg-zinc-700/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setSelectedIcon(name)}
                  >
                    <Icon
                      icon={`${iconsData.prefix}:${name}`}
                      width={iconSize}
                      height={iconSize}
                      style={{ color: iconColor }}
                      className="transition-transform group-hover:scale-110"
                    />
                    <span className="mt-2 text-xs text-zinc-500 group-hover:text-zinc-300 truncate max-w-full text-center">
                      {name}
                    </span>

                    {/* 悬浮操作按钮 */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900/80 rounded-xl">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyIconCode(name);
                        }}
                        className="p-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors"
                        title={t("copyCode")}
                      >
                        {copiedIcon === name ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadSvg(name);
                        }}
                        className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-colors"
                        title={t("downloadSvg")}
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <svg
                  className="mx-auto w-16 h-16 text-zinc-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-4 text-zinc-500">{t("noIconsFound")}</p>
              </div>
            )}
          </div>

          {/* 使用说明 */}
          <div className="card p-6 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t("usageInstructions")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-zinc-300 mb-2">{t("installDeps")}</h3>
                <div className="code-preview">
                  <pre className="text-emerald-400">npm install @iconify/react</pre>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-zinc-300 mb-2">{t("importAndRegister")}</h3>
                <div className="code-preview">
                  <pre className="text-sky-400">{`import { addCollection, Icon } from '@iconify/react';
import iconsData from './icons.json';

addCollection(iconsData);`}</pre>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-zinc-300 mb-2">{t("useIcon")}</h3>
                <div className="code-preview">
                  <pre className="text-amber-400">{`<Icon icon="${iconsData.prefix}:frame-1" width={48} height={48} />`}</pre>
                </div>
              </div>
            </div>

            {/* IntelliSense Promo */}
            <div className="mt-6 pt-6 border-t border-zinc-700/50">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <Icon icon="logos:visual-studio-code" width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Iconify IntelliSense</h3>
                    <p className="text-xs text-zinc-400">{language === 'zh' ? '配置 VS Code 插件获得自动补全和预览功能' : 'Configure VS Code extension for autocomplete and preview'}</p>
                  </div>
                </div>
                <Link
                  href="/intellisense"
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  {t("viewGuide")}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 图标详情模态框 */}
      {selectedIcon && (
        <div className="modal-overlay" onClick={() => setSelectedIcon(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                {selectedIcon}
              </h3>
              <button
                onClick={() => setSelectedIcon(null)}
                className="p-2 rounded-lg hover:bg-zinc-700 transition-colors"
              >
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 图标预览 */}
            <div className="flex justify-center py-12 bg-zinc-800/50 rounded-xl mb-6">
              <Icon
                icon={`${iconsData.prefix}:${selectedIcon}`}
                width={128}
                height={128}
                style={{ color: iconColor }}
              />
            </div>

            {/* 图标信息 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-zinc-800/50 rounded-lg">
                <div className="text-xs text-zinc-500 mb-1">{t("prefixName")}</div>
                <div className="text-sm font-mono text-zinc-200">{iconsData.prefix}</div>
              </div>
              <div className="p-4 bg-zinc-800/50 rounded-lg">
                <div className="text-xs text-zinc-500 mb-1">{language === 'zh' ? '名称' : 'Name'}</div>
                <div className="text-sm font-mono text-zinc-200">{selectedIcon}</div>
              </div>
            </div>

            {/* 使用代码 */}
            <div className="mb-6">
              <div className="text-sm font-medium text-zinc-300 mb-2">React {t("code")}</div>
              <div className="code-preview flex items-center justify-between">
                <pre className="text-emerald-400">{`<Icon icon="${iconsData.prefix}:${selectedIcon}" />`}</pre>
                <button
                  onClick={() => copyIconCode(selectedIcon)}
                  className="p-2 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  {copiedIcon === selectedIcon ? (
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>


            {/* 测试图标 */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-zinc-400">{t("test")}:</span>
              <Icon icon="icon:frame-2" width={32} height={32} />
              <span className="icon:frame-2" />
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <button
                onClick={() => copyIconCode(selectedIcon)}
                className="btn-primary flex-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {t("copyCode")}
              </button>
              <button
                onClick={() => downloadSvg(selectedIcon)}
                className="btn-secondary flex-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t("downloadSvg")}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* 测试图标展示 */}
      <div className="fixed bottom-4 right-4 p-4 bg-zinc-800/90 rounded-xl border border-zinc-700 shadow-lg">
        <p className="text-xs text-zinc-400 mb-2">{t("testIcon")}: icon:frame-3</p>
        <Icon icon="icon:frame-3" width={48} height={48} />
      </div>

      {/* Toast 通知 */}
      {copiedIcon && (
        <div className="toast success flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{t("codeCopied")}</span>
        </div>
      )}
    </div>
  );
}
