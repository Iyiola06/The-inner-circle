import { useEffect } from 'react';

export interface SeoConfig {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  structuredData?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_IMAGE = '/logo1.jpeg';
const SITE_NAME = 'The Inner Circle';

const ensureMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });

  return element;
};

const ensureLink = (rel: string) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  return element;
};

const ensureScript = (id: string) => {
  let element = document.head.querySelector(`#${id}`) as HTMLScriptElement | null;
  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.id = id;
    document.head.appendChild(element);
  }
  return element;
};

export const buildAbsoluteUrl = (path = '/') => {
  const origin = window.location.origin;
  return new URL(path, origin).toString();
};

export const useSeo = ({
  title,
  description,
  path = '/',
  keywords = [],
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  structuredData,
}: SeoConfig) => {
  useEffect(() => {
    const canonicalUrl = buildAbsoluteUrl(path);
    const imageUrl = buildAbsoluteUrl(image);
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;

    ensureMeta('meta[name="description"]', { name: 'description', content: description });
    ensureMeta('meta[name="keywords"]', { name: 'keywords', content: keywords.join(', ') });
    ensureMeta('meta[name="robots"]', { name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large' });
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    ensureMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    ensureMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });

    const canonical = ensureLink('canonical');
    canonical.href = canonicalUrl;

    const script = ensureScript('seo-structured-data');
    if (structuredData) {
      const payload = Array.isArray(structuredData) ? structuredData : [structuredData];
      script.textContent = JSON.stringify(payload);
    } else {
      script.textContent = '';
    }
  }, [description, image, keywords, noindex, path, structuredData, title, type]);
};
