"use client";

import React, { useState, useEffect, createContext, useContext } from "react";

export type Language = "zh" | "en";

export const translations = {
  // Title & Header
  title: {
    zh: "SVG 转 ICONIFY",
    en: "SVG TO ICONIFY",
  },
  subtitle: {
    zh: "将原始 SVG 文件转换为统一的 Iconify JSON 集合。为现代 Web 开发而生。",
    en: "Transform raw SVG files into a unified Iconify JSON collection. Ready for modern web development.",
  },
  liveDemo: {
    zh: "在线演示",
    en: "Live Demo",
  },
  intellisenseConfig: {
    zh: "IntelliSense 配置",
    en: "IntelliSense Config",
  },

  // Steps
  step1: {
    zh: "上传文件",
    en: "Upload Files",
  },
  step2: {
    zh: "配置信息",
    en: "Configuration",
  },
  step3: {
    zh: "预览与导出",
    en: "Review & Export",
  },

  // FileUploader
  dropZoneTitle: {
    zh: "点击或拖拽 SVG 文件到此处",
    en: "Click or drag SVG files here",
  },
  dropZoneSub: {
    zh: "支持批量上传，仅限 .svg 格式",
    en: "Support batch upload, .svg only",
  },

  // ConfigForm
  prefixLabel: {
    zh: "前缀 (Prefix)",
    en: "PREFIX",
  },
  prefixDesc: {
    zh: "例如 'mdi' 或 'custom'",
    en: "e.g. 'mdi' or 'custom'",
  },
  collectionLabel: {
    zh: "集合名称 (Collection Name)",
    en: "COLLECTION NAME",
  },
  collectionDesc: {
    zh: "用于 JSON 元数据",
    en: "For JSON metadata",
  },
  useCurrentColorTitle: {
    zh: "使用 currentColor",
    en: "Use currentColor",
  },
  useCurrentColorDesc: {
    zh: "将 SVG 中的颜色替换为 currentColor，使图标可继承父元素颜色",
    en: "Replace colors with currentColor to allow icons to inherit parent text color",
  },

  // Review & Export
  previewJson: {
    zh: "预览生成的 JSON",
    en: "Preview generated JSON",
  },
  copy: {
    zh: "复制",
    en: "Copy",
  },
  copied: {
    zh: "已复制",
    en: "Copied",
  },
  exportJson: {
    zh: "导出 Iconify JSON",
    en: "Export Iconify JSON",
  },
  remove: {
    zh: "移除",
    en: "Remove",
  },

  // Demo Page
  demoTitle: {
    zh: "图标集合预览",
    en: "Iconify Collection Preview",
  },
  demoDesc: {
    zh: "自定义 Iconify 图标集合演示页面，支持搜索、预览、复制代码和下载 SVG",
    en: "Custom Iconify collection demo. Supports search, preview, code copying and SVG download.",
  },
  searchIcons: {
    zh: "搜索图标...",
    en: "Search icons...",
  },
  iconSize: {
    zh: "尺寸",
    en: "Size",
  },
  iconColor: {
    zh: "颜色",
    en: "Color",
  },
  iconList: {
    zh: "图标列表",
    en: "Icon List",
  },
  noIconsFound: {
    zh: "未找到匹配的图标",
    en: "No matching icons found",
  },
  usageInstructions: {
    zh: "使用说明",
    en: "Usage Instructions",
  },
  installDeps: {
    zh: "1. 安装依赖",
    en: "1. Install Dependencies",
  },
  importAndRegister: {
    zh: "2. 导入并注册图标集",
    en: "2. Import and Register",
  },
  useIcon: {
    zh: "3. 使用图标",
    en: "3. Usage",
  },
  viewGuide: {
    zh: "查看配置指南",
    en: "View Setup Guide",
  },
  copyCode: {
    zh: "复制代码",
    en: "Copy Code",
  },
  downloadSvg: {
    zh: "下载 SVG",
    en: "Download SVG",
  },
  codeCopied: {
    zh: "代码已复制到剪贴板",
    en: "Code copied to clipboard",
  },
  totalIcons: {
    zh: "总图标数",
    en: "Total Icons",
  },
  defaultWidth: {
    zh: "默认宽度",
    en: "Default Width",
  },
  defaultHeight: {
    zh: "默认高度",
    en: "Default Height",
  },
  prefixName: {
    zh: "前缀名",
    en: "Prefix",
  },
  back: {
    zh: "返回",
    en: "Back",
  },
  code: {
    zh: "代码",
    en: "Code",
  },
  test: {
    zh: "测试",
    en: "Test",
  },
  testIcon: {
    zh: "测试图标",
    en: "Test Icon",
  },
  guideTitle: {
    zh: "配置指南",
    en: "Setup Guide",
  },
  guideDesc: {
    zh: "通过配置 VS Code 的 Iconify IntelliSense 插件，实现自定义图标的自动补全、预览和悬停提示，极大地提升开发体验。",
    en: "Boost your development experience by configuring the Iconify IntelliSense plugin for VS Code with autocomplete, preview, and hover tips for your custom icons.",
  },
  installPlugin: {
    zh: "安装插件",
    en: "Install Plugin",
  },
  projectConfig: {
    zh: "项目配置",
    en: "Project Config",
  },
  usageEffect: {
    zh: "使用效果",
    en: "Usage Effect",
  },
  tipsTitle: {
    zh: "注意事项",
    en: "Tips & Notes",
  },

  // Footer
  footer: {
    zh: "SVG to Iconify 转换器。为开发者打造。",
    en: "SVG to Iconify Converter. Built for developers.",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("lang") as Language;
    if (savedLang && (savedLang === "zh" || savedLang === "en")) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const t = (key: keyof typeof translations) => {
    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
