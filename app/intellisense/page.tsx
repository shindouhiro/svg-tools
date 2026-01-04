'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useLanguage } from '../utils/i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function IntelliSenseGuide() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-16">
          <div className="flex justify-between items-start mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t("back")}
            </Link>
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              <Icon icon="logos:visual-studio-code" width={40} height={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Iconify IntelliSense <span className="gradient-text uppercase">{t("guideTitle")}</span>
            </h1>
          </div>

          <p className="text-xl text-zinc-400 leading-relaxed">
            {t("guideDesc")}
          </p>
        </header>

        {/* Content */}
        <div className="space-y-12">
          {/* Step 1: Install */}
          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-bold">01</span>
              {t("installPlugin")}
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <p className="text-zinc-300 mb-4">
                  {language === 'zh' ? '在 VS Code 扩展市场搜索并安装' : 'Search and install in VS Code marketplace'} <strong className="text-white">Iconify IntelliSense</strong> {language === 'zh' ? '插件' : 'plugin'}.
                </p>
                <div className="bg-[#1e1e1e] p-4 rounded-lg border border-[#333]">
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:microsoft-visual-studio-code" width={24} className="text-blue-500" />
                    <span className="text-zinc-400">ext install antfu.iconify</span>
                  </div>
                </div>
              </div>
              <div className="px-4 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30">
                Created by Anthony Fu
              </div>
            </div>
          </section>

          {/* Step 2: Configuration */}
          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold">02</span>
              {t("projectConfig")}
            </h2>
            <p className="text-zinc-300 mb-6">
              {language === 'zh' ? '在项目根目录下创建或编辑' : 'Create or edit'} <code className="px-2 py-1 bg-zinc-800 rounded text-amber-300">.vscode/settings.json</code> {language === 'zh' ? '文件，添加以下配置以指向生成的 JSON 文件。' : 'file in your project root, and add the following config to point to your JSON file.'}
            </p>

            <div className="code-preview">
              <div className="flex items-center justify-between mb-2 text-xs text-zinc-500 px-2">
                <span>.vscode/settings.json</span>
                <button
                  className="hover:text-white transition-colors uppercase font-bold"
                  onClick={() => navigator.clipboard.writeText(`{
  "iconify.customCollectionJsonPaths": [
    "app/utils/icons.json"
  ]
}`)}
                >
                  {t("copyCode")}
                </button>
              </div>
              <pre className="text-sky-300 bg-[#0d0d0f] p-4 rounded-lg overflow-x-auto">{`{
  // ${language === 'zh' ? '指定自定义图标 JSON 文件的路径' : 'Specify the path to your custom icons JSON'}
  "iconify.customCollectionJsonPaths": [
    "app/utils/icons.json"
  ],
  
  // ${language === 'zh' ? '可选：启用预览颜色' : 'Optional: Enable preview colors'}
  "iconify.preview": true,
  
  // ${language === 'zh' ? '可选：配置包含的文件类型' : 'Optional: Configure included file types'}
  "iconify.includes": [
    "**/*.{js,jsx,ts,tsx,vue,html,css,scss,json}"
  ]
}`}</pre>
            </div>
          </section>

          {/* Step 3: Usage */}
          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold">03</span>
              {t("usageEffect")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-white">{language === 'zh' ? '自动补全' : 'Autocomplete'}</h3>
                <p className="text-sm text-zinc-400">
                  {language === 'zh' ? '输入图标前缀（如' : 'When you type the prefix (e.g.'} <code className="text-emerald-400">icon:</code>{language === 'zh' ? '）时，会自动显示所有可用图标。' : '), it will suggest available icons.'}
                </p>
                <div className="aspect-video bg-[#0d0d0f] rounded-lg border border-[#333] flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6">
                    <div className="font-mono text-sm text-zinc-500">
                      &lt;Icon icon="<span className="text-emerald-400">icon:</span>|"/&gt;
                    </div>
                    <div className="mt-2 bg-[#252526] border border-[#333] rounded shadow-xl w-48 p-1 animate-pulse">
                      <div className="px-2 py-1 text-xs text-white bg-[#04395e]">icon:frame-1</div>
                      <div className="px-2 py-1 text-xs text-zinc-400">icon:frame-2</div>
                      <div className="px-2 py-1 text-xs text-zinc-400">icon:settings</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-white">{language === 'zh' ? '悬停预览' : 'Hover Preview'}</h3>
                <p className="text-sm text-zinc-400">
                  {language === 'zh' ? '将鼠标悬停在图标名称上，可以看到图标的实时预览和 SVG 代码。' : 'Hover over the icon name to see a live preview and SVG code.'}
                </p>
                <div className="aspect-video bg-[#0d0d0f] rounded-lg border border-[#333] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-[#252526] border border-[#333] p-3 rounded shadow-xl flex gap-3">
                      <div className="w-12 h-12 bg-[#1e1e1e] flex items-center justify-center rounded">
                        <Icon icon="mdi:checkbox-marked-circle-outline" className="w-8 h-8 text-emerald-500" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-xs text-zinc-300 font-mono">mdi:checkbox...</span>
                        <span className="text-[10px] text-zinc-500">24x24</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tips */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="p-3 bg-amber-500/20 rounded-full shrink-0">
              <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-amber-200 mb-1">{t("tipsTitle")}</h4>
              <p className="text-sm text-zinc-400">
                {language === 'zh'
                  ? '如果配置后没有立即生效，请尝试重启 VS Code 或执行命令 Developer: Reload Window。确保 icons.json 文件路径正确。'
                  : 'If it doesn\'t work immediately, try restarting VS Code or run the "Developer: Reload Window" command. Ensure the path to icons.json is correct.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

