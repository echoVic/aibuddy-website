import { LanguageProvider } from "@/components/language-provider";
import HomeContent from "./home-content";

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
