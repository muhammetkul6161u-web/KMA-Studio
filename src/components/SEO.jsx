import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type = 'website', image, url, schema }) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dizvyn.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/src/assets/logo.webp`;

    // Default JSON-LD for LocalBusiness / WebDesignStudio
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebDesignService",
    "name": "Dizvyn",
    "alternateName": "Dizvyn Dijital Çözümler",
    "image": imageUrl,
    "url": siteUrl,
    "logo": `${siteUrl}/src/assets/logo.webp`,
    "sameAs": [
      "https://www.instagram.com/dizvyn",
      "https://www.linkedin.com/company/dizvyn"
    ],
    "description": "Dizvyn, modern web teknolojileri, UI/UX tasarım ve butik dijital çözümler sunan kreatif bir dijital ajans."
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title ? `${title} | Dizvyn` : 'Dizvyn — Butik Web Tasarım ve Dijital Ajans'}</title>
      <meta name='description' content={description || "Dizvyn, markanızı dijital geleceğe taşıyan butik bir dijital ajanstır. Modern, minimal ve performans odaklı özel yazılım çözümleri."} />
      <meta name='keywords' content="web tasarım, özel yazılım, kreatif ajans, Dizvyn, dijital dönüşüm, UI/UX tasarım, butik dijital ajans, performanslı web siteleri, React geliştirme" />
      <link rel="canonical" href={fullUrl} />

      {/* OpenGraph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
