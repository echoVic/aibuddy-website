#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// 读取 markdown 文件
const mdPath = process.argv[2] || 'public/guides/openclaw-quickstart.md';
const outputPath = process.argv[3] || 'public/guides/openclaw-quickstart.pdf';

if (!fs.existsSync(mdPath)) {
  console.error('File not found:', mdPath);
  process.exit(1);
}

const content = fs.readFileSync(mdPath, 'utf-8');

// 创建简单的 HTML
const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>OpenClaw 快速上手指南</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
      color: #333;
    }
    h1 { color: #111; border-bottom: 2px solid #eee; padding-bottom: 10px; }
    h2 { color: #222; margin-top: 30px; }
    h3 { color: #333; }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: "Monaco", "Menlo", monospace;
      font-size: 0.9em;
    }
    pre {
      background: #f8f8f8;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    pre code {
      background: none;
      padding: 0;
    }
    blockquote {
      border-left: 4px solid #ddd;
      margin: 0;
      padding-left: 20px;
      color: #666;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    th {
      background: #f5f5f5;
    }
  </style>
</head>
<body>
${require('marked').parse(content)}
</body>
</html>`;

// 保存 HTML（可以用浏览器打印成 PDF）
const htmlOutput = outputPath.replace('.pdf', '.html');
fs.writeFileSync(htmlOutput, html);
console.log('HTML generated:', htmlOutput);
console.log('Please open this HTML in browser and print to PDF, or use a PDF conversion tool.');
