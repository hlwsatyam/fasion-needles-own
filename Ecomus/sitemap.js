const fs = require("fs");
const path = require("path");

const generateSitemap = () => {
    // Static routes
    const staticRoutes = [
        { path: "/login", priority: 0.7 },
        { path: "/", priority: 1.0 },
        { path: "/home", priority: 0.9 },
        { path: "/about", priority: 0.8 },
        { path: "/cart", priority: 0.7 },
        { path: "/wishlist", priority: 0.6 },
        { path: "/checkout", priority: 0.9 },
        { path: "/profile", priority: 0.8 },
        { path: "/contact-us", priority: 0.8 },
        { path: "/faq", priority: 0.6 },
        // Add more static routes here
    ];

    // Dynamic data
    const products = [
        { name: "product1", id: "1", lastmod: "2024-12-01", priority: 0.8 },
        { name: "product2", id: "2", lastmod: "2024-11-30", priority: 0.8 },
        // Add more products
    ];
    const categories = [
        { name: "category1", lastmod: "2024-11-28", priority: 0.9 },
        { name: "category2", lastmod: "2024-11-27", priority: 0.9 },
        // Add more categories
    ];
    const brands = [
        { name: "brand1", lastmod: "2024-11-26", priority: 0.7 },
        { name: "brand2", lastmod: "2024-11-25", priority: 0.7 },
        // Add more brands
    ];

    // Build URL entries
    const buildUrlEntry = ({ path, lastmod, priority }) => `
    <url>
        <loc>https://fashionneedles.com${path}</loc>
        <changefreq>${priority === 1.0 ? "daily" : "weekly"}</changefreq>
        <priority>${priority}</priority>
        <lastmod>${lastmod || new Date().toISOString()}</lastmod>
    </url>`;

    const staticUrls = staticRoutes.map(route =>
        buildUrlEntry({
            path: route.path,
            priority: route.priority,
        })
    );

    const dynamicProductUrls = products.map(product =>
        buildUrlEntry({
            path: `/productdetails/${product.name}/${product.id}`,
            lastmod: product.lastmod,
            priority: product.priority,
        })
    );

    const dynamicCategoryUrls = categories.map(category =>
        buildUrlEntry({
            path: `/category/${category.name}`,
            lastmod: category.lastmod,
            priority: category.priority,
        })
    );

    const dynamicBrandUrls = brands.map(brand =>
        buildUrlEntry({
            path: `/brand/${brand.name}`,
            lastmod: brand.lastmod,
            priority: brand.priority,
        })
    );

    const allUrls = [
        ...staticUrls,
        ...dynamicProductUrls,
        ...dynamicCategoryUrls,
        ...dynamicBrandUrls,
    ];

    // Generate sitemap content
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls.join("")}
</urlset>`;

    // Save the sitemap
    const outputPath = path.join(__dirname, "/public/sitemap.xml");
    fs.writeFileSync(outputPath, sitemapContent, "utf8");
    console.log("Sitemap generated successfully at:", outputPath);
};

generateSitemap();
