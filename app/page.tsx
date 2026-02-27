import type { Metadata } from 'next';
import Script from 'next/script';
import { LanguageProvider } from "@/components/language-provider";
import HomeContent from "./home-content";

export const metadata: Metadata = {
  title: "AI Buddy | $1 开启 AI 实战之旅",
  description: "实战 AI 教程、开箱即用的 Agent 配置、OpenClaw 工作流模板。从 $1 开始，即刻上手。",
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AI Buddy',
  url: 'https://aibuddy.ltd',
  logo: 'https://aibuddy.ltd/logo.png',
  sameAs: [
    'https://github.com/echoVic/aibuddy-website',
    'https://discord.gg/39sVCGPU',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@aibuddy.ltd',
    contactType: 'customer support',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI Buddy',
  url: 'https://aibuddy.ltd',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://aibuddy.ltd/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function Home() {
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <LanguageProvider>
        <HomeContent />
      </LanguageProvider>
    </>
  );
}
