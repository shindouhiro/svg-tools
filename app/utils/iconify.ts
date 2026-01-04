// Iconify JSON 格式接口定义
export interface IconifyIcon {
  body: string;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}

export interface IconifyJSON {
  prefix: string;
  icons: Record<string, IconifyIcon>;
  width?: number;
  height?: number;
  lastModified?: number;
  info?: {
    name: string;
    total: number;
    author?: {
      name: string;
      url?: string;
    };
    license?: {
      title: string;
      spdx?: string;
      url?: string;
    };
    version?: string;
    samples?: string[];
    height?: number | number[];
    displayHeight?: number;
    category?: string;
    palette?: boolean;
  };
}

export interface ParsedSVG {
  name: string;
  body: string;
  width: number;
  height: number;
  originalSvg: string;
  file?: File;
}

/**
 * 解析SVG字符串，提取body和尺寸信息
 */
export function parseSVG(svgContent: string, fileName: string): ParsedSVG | null {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, "image/svg+xml");
    const svgElement = doc.querySelector("svg");

    if (!svgElement) {
      console.error("No SVG element found in:", fileName);
      return null;
    }

    // 获取viewBox或width/height
    const viewBox = svgElement.getAttribute("viewBox");
    let width = 24;
    let height = 24;

    if (viewBox) {
      const parts = viewBox.split(/\s+/).map(Number);
      if (parts.length === 4) {
        width = parts[2];
        height = parts[3];
      }
    } else {
      const widthAttr = svgElement.getAttribute("width");
      const heightAttr = svgElement.getAttribute("height");
      if (widthAttr) width = parseFloat(widthAttr) || 24;
      if (heightAttr) height = parseFloat(heightAttr) || 24;
    }

    // 获取SVG内部内容作为body
    const body = svgElement.innerHTML.trim();

    // 从文件名生成图标名称（移除.svg后缀，转换为kebab-case）
    const name = fileName
      .replace(/\.svg$/i, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5-_]/g, "")
      .toLowerCase();

    return {
      name,
      body,
      width,
      height,
      originalSvg: svgContent,
    };
  } catch (error) {
    console.error("Error parsing SVG:", fileName, error);
    return null;
  }
}

/**
 * 读取文件内容为文本
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}

/**
 * 生成Iconify JSON
 */
export function generateIconifyJSON(
  icons: ParsedSVG[],
  prefix: string,
  name?: string
): IconifyJSON {
  const iconRecord: Record<string, IconifyIcon> = {};

  // 计算最常见的尺寸作为默认值
  const sizeCount: Record<string, number> = {};
  icons.forEach((icon) => {
    const key = `${icon.width}x${icon.height}`;
    sizeCount[key] = (sizeCount[key] || 0) + 1;
  });

  let defaultWidth = 24;
  let defaultHeight = 24;
  let maxCount = 0;

  Object.entries(sizeCount).forEach(([key, count]) => {
    if (count > maxCount) {
      maxCount = count;
      const [w, h] = key.split("x").map(Number);
      defaultWidth = w;
      defaultHeight = h;
    }
  });

  // 构建图标记录
  icons.forEach((icon) => {
    const iconData: IconifyIcon = {
      body: icon.body,
    };

    // 只在尺寸与默认值不同时添加
    if (icon.width !== defaultWidth) {
      iconData.width = icon.width;
    }
    if (icon.height !== defaultHeight) {
      iconData.height = icon.height;
    }

    iconRecord[icon.name] = iconData;
  });

  const result: IconifyJSON = {
    prefix,
    icons: iconRecord,
    width: defaultWidth,
    height: defaultHeight,
    lastModified: Math.floor(Date.now() / 1000),
  };

  // 添加info信息
  if (name || icons.length > 0) {
    result.info = {
      name: name || prefix,
      total: icons.length,
      height: defaultHeight,
      samples: icons.slice(0, 3).map((i) => i.name),
    };
  }

  return result;
}

/**
 * 下载JSON文件
 */
export function downloadJSON(data: IconifyJSON, filename: string) {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".json") ? filename : `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 渲染SVG图标
 */
export function renderIcon(icon: ParsedSVG, size: number = 32): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${icon.width} ${icon.height}" fill="currentColor">${icon.body}</svg>`;
}

/**
 * 验证是否为有效的SVG文件
 */
export function isValidSVGFile(file: File): boolean {
  return (
    file.type === "image/svg+xml" ||
    file.name.toLowerCase().endsWith(".svg")
  );
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
