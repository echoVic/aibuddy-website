import type { Metadata } from 'next';
import DownloadContent from './DownloadContent';

export const metadata: Metadata = {
  title: "我的下载",
};

export default function DownloadsPage() {
  return <DownloadContent />;
}
