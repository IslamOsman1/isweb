import { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { useSiteData } from '../data/DataContext';

const DEFAULT_SITE_URL = 'https://iswebstudio.tech';
const DEFAULT_SOCIALS = [
  'https://facebook.com/iswebstudio',
  'https://instagram.com/iswebstudio',
  'https://github.com/iswebstudio',
];

function normalizeUrl(value, fallback = DEFAULT_SITE_URL) {
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value.replace(/\/$/, '');
  return `${fallback.replace(/\/$/, '')}/${value.replace(/^\//, '')}`;
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value) element.setAttribute(key, value);
  });
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value) element.setAttribute(key, value);
  });
}

function removeElement(selector) {
  document.head.querySelector(selector)?.remove();
}

function upsertScript(schemaKey, payload) {
  let element = document.head.querySelector(`script[data-seo-schema="${schemaKey}"]`);

  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.setAttribute('data-seo-schema', schemaKey);
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(payload);
}

function buildFallbackTitle(brandName, lang) {
  return lang === 'ar'
    ? `${brandName} | تصميم وتطوير مواقع ومتاجر إلكترونية باحتراف`
    : `${brandName} | Web Design, Development, and E-Commerce Solutions`;
}

function buildFallbackDescription(brandName, lang, settings, services) {
  const serviceNames = (services || [])
    .slice(0, 4)
    .map((service) => (lang === 'ar' ? service.titleAr : service.titleEn))
    .filter(Boolean);

  if (lang === 'ar') {
    const serviceText = serviceNames.length ? `نقدم ${serviceNames.join('، ')}.` : '';
    return `${brandName} ${serviceText} نصمم ونطور تجارب رقمية سريعة وحديثة تساعد نشاطك التجاري على النمو. ${settings.addressAr || ''}`.trim();
  }

  const serviceText = serviceNames.length ? `We offer ${serviceNames.join(', ')}.` : '';
  return `${brandName} ${serviceText} We build fast modern digital experiences that help your business grow. ${settings.addressEn || ''}`.trim();
}

function buildFallbackKeywords(brandName, lang, services) {
  const baseKeywords = lang === 'ar'
    ? ['تصميم مواقع', 'تطوير مواقع', 'متجر إلكتروني', 'لوحات تحكم', 'تحسين محركات البحث']
    : ['web design', 'web development', 'ecommerce development', 'dashboards', 'SEO'];

  const serviceKeywords = (services || [])
    .slice(0, 6)
    .map((service) => (lang === 'ar' ? service.titleAr : service.titleEn))
    .filter(Boolean);

  return [...baseKeywords, ...serviceKeywords, brandName].join(', ');
}

function SeoHead() {
  const { lang } = useLanguage();
  const { content } = useSiteData();
  const settings = content?.settings || {};
  const services = content?.services || [];

  useEffect(() => {
    const brandName = settings.brandName || 'IsWeb Studio';
    const siteUrl = normalizeUrl(settings.siteUrl || import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL);
    const currentUrl = new URL(window.location.href);
    const isAdminPage = currentUrl.pathname.startsWith('/admin');
    currentUrl.searchParams.set('lang', lang);
    const localizedUrl = `${siteUrl}${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
    const alternateLang = lang === 'ar' ? 'en' : 'ar';
    const alternateUrl = new URL(localizedUrl);
    alternateUrl.searchParams.set('lang', alternateLang);
    const image = normalizeUrl(settings.seoImage || settings.heroImage || '/logo.png', siteUrl);
    const title = (lang === 'ar' ? settings.seoTitleAr : settings.seoTitleEn) || buildFallbackTitle(brandName, lang);
    const description =
      (lang === 'ar' ? settings.seoDescriptionAr : settings.seoDescriptionEn) ||
      buildFallbackDescription(brandName, lang, settings, services);
    const keywords =
      (lang === 'ar' ? settings.seoKeywordsAr : settings.seoKeywordsEn) ||
      buildFallbackKeywords(brandName, lang, services);
    const socialLinks = [settings.facebookUrl, settings.instagramUrl, settings.githubUrl]
      .filter(Boolean);
    const sameAs = socialLinks.length ? socialLinks : DEFAULT_SOCIALS;

    document.title = isAdminPage ? `${brandName} | Admin` : title;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
    upsertMeta('meta[name="author"]', { name: 'author', content: brandName });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: isAdminPage
        ? 'noindex, nofollow, noarchive'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color', content: '#0b101e' });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: brandName });
    upsertMeta('meta[property="og:locale"]', {
      property: 'og:locale',
      content: lang === 'ar' ? 'ar_AR' : 'en_US',
    });
    upsertMeta('meta[property="og:locale:alternate"]', {
      property: 'og:locale:alternate',
      content: lang === 'ar' ? 'en_US' : 'ar_AR',
    });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: localizedUrl });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    upsertMeta('meta[property="og:image:alt"]', {
      property: 'og:image:alt',
      content: brandName,
    });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: localizedUrl });
    upsertLink('link[rel="alternate"][hreflang="ar"]', {
      rel: 'alternate',
      hreflang: 'ar',
      href: `${siteUrl}${currentUrl.pathname}?lang=ar`,
    });
    upsertLink('link[rel="alternate"][hreflang="en"]', {
      rel: 'alternate',
      hreflang: 'en',
      href: `${siteUrl}${currentUrl.pathname}?lang=en`,
    });
    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${siteUrl}${currentUrl.pathname}?lang=ar`,
    });

    if (isAdminPage) {
      removeElement('script[data-seo-schema="organization"]');
      removeElement('script[data-seo-schema="website"]');
      return;
    }

    upsertScript('organization', {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#organization`,
      name: brandName,
      url: localizedUrl,
      logo: image,
      image,
      telephone: settings.phone || undefined,
      email: settings.email || undefined,
      description,
      areaServed: lang === 'ar' ? 'العالم' : 'Worldwide',
      availableLanguage: ['ar', 'en'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: lang === 'ar' ? settings.addressAr : settings.addressEn,
      },
      sameAs,
      serviceType: services
        .map((service) => (lang === 'ar' ? service.titleAr : service.titleEn))
        .filter(Boolean),
    });

    upsertScript('website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: brandName,
      inLanguage: lang,
      description,
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    });
  }, [content, lang, settings, services]);

  return null;
}

export default SeoHead;
