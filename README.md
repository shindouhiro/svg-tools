# SVG to Iconify Converter

[English](./README.md) | [简体中文](./README.md#简体中文)

A powerful web-based tool to batch convert SVG files into a unified **Iconify JSON** collection. Designed for modern web development.

## 🚀 Features

- **Batch Management**: Easily manage and transform hundreds of SVG files into a single optimized collection.
- **Quick Color Toggle**: Instantly switch between original colors and `currentColor` to test theme compatibility.
- **Editor Live Preview**: Integrated with VS Code to preview icons directly in your code editor as you type.
- **Smart Color Handling**: Optional `currentColor` replacement to make your icons themeable (inherit parent text color).
- **JSON Preview**: Real-time preview of the generated Iconify JSON before exporting.
- **Live Demo Page**: Instantly preview how converted icons look and function in a real React environment.
- **IntelliSense Support**: Built-in guide for configuring VS Code Iconify IntelliSense for autocomplete and hover previews.
- **i18n Support**: Full support for both Chinese and English interfaces.
- **Premium Design**: Sleek dark theme with glassmorphism effects and smooth animations.

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS
- **Icon Engine**: [@iconify/react](https://iconify.design/docs/libraries/react/)
- **Language**: TypeScript

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

# 简体中文

SVG 转 Iconify 转换器。一个强大的网页化工具，可将批量 SVG 文件转换为统一的 **Iconify JSON** 集合。为现代 Web 开发而生。

## 🚀 功能特性

- **批量管理与转换**：轻松管理并转换数以百计的 SVG 文件为单一优化集合。
- **颜色快速切换**：一键切换原始颜色与 `currentColor` 模式，实现在线颜色预览与兼容性测试。
- **编辑器直接预览**：配合 VS Code 插件，在编写代码时直接在编辑器中实时预览图标。
- **智能颜色处理**：支持将 SVG 中的硬编码颜色替换为 `currentColor`，使图标能自动继承文本颜色。
- **JSON 实时预览**：在导出前实时查看生成的 Iconify JSON 内容。
- **在线演示页面**：立刻预览转换后的图标在真实 React 环境中的效果。
- **智能提示支持**：内置 VS Code Iconify IntelliSense 配置指南，实现自动补全和悬停预览。
- **多语言支持**：完美支持中英文界面切换。
- **精致设计**：采用毛玻璃效果和丝滑动画的深色系高级感设计。

## 🛠 技术栈

- **框架**：[Next.js 15+](https://nextjs.org/) (App Router)
- **样式**：Tailwind CSS
- **图标引擎**：[@iconify/react](https://iconify.design/docs/libraries/react/)
- **语言**：TypeScript

## 📦 快速开始

### 开发环境要求

- Node.js 18+
- npm / yarn / pnpm

### 安装步骤

1. 克隆仓库
2. 安装依赖：
   ```bash
   npm install
   ```
3. 启动开发服务器：
   ```bash
   npm run dev
   ```
4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

## 📝 使用指南

1. **上传**：将 SVG 文件拖入上传区。
2. **配置**：设置图标前缀（Prefix）和集合名称。
3. **颜色**：根据需要开启 "使用 currentColor"。
4. **导出**：点击 "Export Iconify JSON" 下载配置文件。
5. **集成**：按照演示页面说明，将 JSON 导入你的项目并配准 VS Code 插件。

## 📄 开源协议

MIT License
