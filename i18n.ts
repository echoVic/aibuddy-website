import { getRequestConfig } from 'next-intl/server';
 
export default getRequestConfig(async () => {
  // Provide a static locale for now, we'll make it dynamic later
  const locale = 'zh';
 
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});