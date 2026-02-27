import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Buddy - AI Learning & Agent Configurations",
  description: "实战 AI 教程、开箱即用的 Agent 配置、OpenClaw 工作流模板。从 $1 开始，即刻上手。",
  keywords: ["AI", "Agent", "OpenClaw", "MCP", "教程", "配置"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="system" storageKey="aibuddy-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}