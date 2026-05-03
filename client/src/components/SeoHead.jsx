import { useEffect } from 'react';

const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://isweb.studio').replace(/\/$/, '');
const siteName = 'IsWeb Studio';
const defaultTitle = 'IsWeb Studio | تصميم وتطوير مواقع ومتاجر إلكترونية باحتراف';
const defaultDescription =
  'نصمم ونطور مواقع سريعة ومتاجر إلكترونية ولوحات تحكم وتجارب رقمية تساعد نشاطك التجاري على الظهور والنمو.';
const defaultImage = `${siteUrl}/logo.png`;

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function SeoHead() {
  useEffect(() => {
    document.documentElement.lang = 'ar';
    document.title = defaultTitle;

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: defaultDescription,
    });
    upsertMeta('meta[name="keywords"]', {
      name: 'keywords',
      content:
        'تصميم مواقع, تطوير مواقع, متجر إلكتروني, SEO, برمجة مواقع, لوحات تحكم, تطبيقات ويب, IsWeb Studio',
    });
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: defaultTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: defaultDescription,
    });
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: siteUrl,
    });
    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: defaultImage,
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: defaultTitle,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: defaultDescription,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: defaultImage,
    });
    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: `${siteUrl}/`,
    });

    let schema = document.head.querySelector('script[data-seo-schema="organization"]');
    if (!schema) {
      schema = document.createElement('script');
      schema.setAttribute('type', 'application/ld+json');
      schema.setAttribute('data-seo-schema', 'organization');
      document.head.appendChild(schema);
    }

    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: siteName,
      url: `${siteUrl}/`,
      logo: defaultImage,
      image: defaultImage,
      description: defaultDescription,
      email: 'hello@isweb.studio',
      areaServed: 'Worldwide',
      sameAs: [
        'https://facebook.com/iswebstudio',
        'https://instagram.com/iswebstudio',
        'https://github.com/iswebstudio',
      ],
      serviceType: [
        'Web Design',
        'Web Development',
        'E-Commerce Development',
        'SEO Optimization',
        'Dashboard Development',
      ],
    });
  }, []);

  return null;
}

export default SeoHead;
