import React from "react";
import { Helmet } from "react-helmet-async";
import img from "../../img/fashion needles.webp";
const HelmetTag = ({ title,alt, url, keywords, description }) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta
        name="description"
        content={
          description ||
          "Discover the latest trends in men's fashion, stylish clothing, and accessories at Fashion Needles. Shop premium quality at affordable prices."
        }
      />
      <meta
        name="keywords"
        content={
          keywords ||
          "men's fashion, trendy clothes, accessories, affordable fashion, Fashion Needles"
        }
      />
      <meta name="author" content="Fashion Needles" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />

      {/* Open Graph (OG) Tags for Social Media */}
      <meta
        property="og:title"
        content={title || "Fashion Needles - Trendy Men's Fashion"}
      />
      <meta
        property="og:description"
        content={
          description ||
          "Shop stylish and trendy clothing for men at Fashion Needles. Premium quality fashion at affordable prices."
        }
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={url || "https://www.fashionneedles.com"}
      />
      <meta property="og:image" content={img} />
      <meta
        property="og:image:alt"
        content={alt || "Fashion Needles - Men's Trendy Fashion"}
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={"fashionneedles.com"} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="@FASHION_Needles" />
      <meta
        name="twitter:title"
        content={title || "Fashion Needles - Trendy Men's Fashion"}
      />
      <meta
        name="twitter:url"
        content={url || "fashionneedles.com"}
      />
      <meta
        name="twitter:description"
        content={
          description ||
          "Discover the latest trends in men's fashion at Fashion Needles. Stylish clothing and accessories at affordable prices."
        }
      />
      <meta
        name="twitter:image"
        content="https://www.fashionneedles.com/twitter-image.jpg"
      />
      <meta
        name="twitter:image:alt"
        content="Fashion Needles - Men's Trendy Fashion"
      />
      <meta name="twitter:site" content="@FashionNeedles" />
      <meta name="twitter:creator" content="@FashionNeedles" />

      {/* Robots and Crawling */}
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://www.fashionneedles.com" />

      {/* Alternate Languages */}
      <link
        rel="alternate"
        href="https://www.fashionneedles.com"
        hrefLang="en"
      />
      <link
        rel="alternate"
        href="https://www.fashionneedles.com/fr"
        hrefLang="fr"
      />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Fashion Needles",
          url: "https://www.fashionneedles.com",
          logo: "https://www.fashionneedles.com/logo.png",
          description:
            "Discover trendy men's fashion, stylish clothing, and accessories at Fashion Needles.",
          sameAs: [
            "https://www.facebook.com/FashionNeedles",
            "https://twitter.com/FashionNeedles",
            "https://www.instagram.com/FashionNeedles",
            "https://www.linkedin.com/company/FashionNeedles",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-800-555-5555",
            contactType: "Customer Service",
            areaServed: "US",
            availableLanguage: ["English"],
          },
        })}
      </script>

      {/* Breadcrumb Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.fashionneedles.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Men's Fashion",
              item: "https://www.fashionneedles.com/mens-fashion",
            },
          ],
        })}
      </script>

      {/* Product Structured Data Example */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Slim Fit Men's Shirt",
          image: "https://www.fashionneedles.com/product-image.jpg",
          description:
            "A stylish slim fit shirt for men, perfect for casual and formal occasions.",
          brand: {
            "@type": "Brand",
            name: "Fashion Needles",
          },
          sku: "FN12345",
          offers: {
            "@type": "Offer",
            url: "https://www.fashionneedles.com/products/slim-fit-mens-shirt",
            priceCurrency: "USD",
            price: "49.99",
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
          },
        })}
      </script>

      {/* Performance Optimization */}
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
};

export default HelmetTag;
