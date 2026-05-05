import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type = 'website', image, url, schema }) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://kmastüdio.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/src/assets/logo.webp`; // Fallback logo

  // Default JSON-LD for LocalBusiness / WebDesignStudio
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "KMA Web Studio",
    "image": imageUrl,
    "url": siteUrl,
    "telephone": "",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Türkiye"
    },
    "description": "KMA, markanızı dijital geleceğe taşıyan butik bir web teknolojileri stüdyosudur."
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title ? `${title} | KMA Studio` : 'KMA — Premium Web Studio'}</title>
      <meta name='description' content={description} />
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
