const fs = require("fs");
const path = require("path");

const generateSitemap = () => {
    // Static routes
    const staticRoutes = [
        { path: "/login", priority: 0.6 },
        { path: "/", priority: 0.8 },
        { path: "/about", priority: 0.7 },
        { path: "/cart", priority: 0.6 },
        { path: "/wishlist", priority: 0.5 },
        { path: "/checkout", priority: 0.7 },
        { path: "/profile", priority: 0.7 },
        { path: "/privacypolicy", priority: 0.5 },
        { path: "/contact-us", priority: 0.7 },
        { path: "/track-order", priority: 0.5 },
        { path: "/careers", priority: 0.5 },
        { path: "/faq", priority: 0.5 },
        { path: "/shipping-policy", priority: 0.5 },
        { path: "/privacy-policy", priority: 0.5 },
        { path: "/cancellation-policy", priority: 0.5 },
      
        { path: "/forget-pass", priority: 0.5 },
     
        { path: "/order-history-detail", priority: 0.6 },
        { path: "/order-history", priority: 0.6 },
    ];

    // Dynamic routes
    const dynamicRoutes = [
        { path: "/productdetails/Calvin-Klein-Hoodies---Stylish-&-Premium-Comfort/6741a99c92118a40dcd22faf", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Calvin-Klein-Relaxed-Fit-Men’s-Sweatshirt-–-Comfortable-&-Stylish/674989c0e78200a1ff86370f", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Calvin-Klein-Oversized-Monogram-Fleece-Hoodie-–-Cozy-&-Stylish/6749839ce78200a1ff863673", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Calvin-Klein-Relaxed-Fit-Men’s-Sweatshirt-–-Comfortable-&-Stylish/67498beae78200a1ff863752", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Calvin-Klein-Ultra-Light-Down-Puffer-Jacket---Premium-Winter-Comfort-Redefined/67498d57e78200a1ff863774", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/-Calvin-Klein-Jeans-Mock-Collar-Puffer-Jacket-–-Stylish-&-Warm-Outerwear/6749719de78200a1ff86344a", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Calvin-Klein-Pale-Khaki-Regular-Fit-Jacket-–-Stylish-&-Versatile/6749853ce78200a1ff863688", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Calvin-Klein-Jeans-Essentials-Non-Down-Hooded-Puffer-Jacket-–-Sleek-&-Sustainable/67497cbee78200a1ff863547", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Calvin-Klein-Recycled-Nylon-Puffer-Jacket-–-Sustainable-&-Stylish/674988bee78200a1ff863706", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Calvin-Klein-Jeans-Transition-Jacket-J30J324667-–-White-Regular-Fit/67498180e78200a1ff86363f", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Bershka-Women’s-Strappy-Midi-Dress-with-Cut-Out-and-Ruffles-–-Chic-&-Flirty/6742d8b00c357a5e1b362db1", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Calvin-Klein-Slim-Washed-Cotton-Cardigan---Unique-&-Stylish-Layering/674abc56e78200a1ff86416b", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Calvin-Klein-Slim-Washed-Cotton-Cardigan---Unique-&-Stylish-Layering/674abc56e78200a1ff86416b", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Maeve-Ruffled-Poplin-Midi-Skirt-–-Anthropologie-%7C-Chic-&-Feminine/67496906e78200a1ff8632e9", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Maeve-Ruffled-Poplin-Midi-Skirt-–-Anthropologie-%7C-Chic-&-Feminine/67496906e78200a1ff8632e9", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Maeve-Ruffled-Poplin-Midi-Skirt-–-Anthropologie-%7C-Chic-&-Feminine/67496906e78200a1ff8632e9", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Bershka-Viscous-Textured-Long-Summer-Maxi-Dress-–-Elegant-&-Lightweight/6742d6690c357a5e1b362d1a", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Farm-Rio-Toucan-Print-Noodle-Strap-Short-Dress---Bold-&-Trendy/674ac378e78200a1ff864256", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Calvin-Klein-Cropped-V-Neck-Sepia-Rose-Sweatshirt---Stylish-Comfort/674ab8abe78200a1ff86406b", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Women's-Short-Trench-Coats---Stylish-&-Versatile-Outerwear---Free-Assembly/674ae5ef033d9c593a423448", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Free-Assembly-Short-Trench-Coat---Stylish-&-Versatile-Outerwear-for-Women/674ae332033d9c593a42343f", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Coral-Summer-Sun-Mini-Dress---Vibrant-&-Stylish-by-FARM-Rio/674ac206e78200a1ff86421e", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Calvin-Klein-Women's-Beige-Tie-Dye-Side-Gathering-Dress-–-Chic-&-Trendy/67497e92e78200a1ff8635c7", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/ASOS-Black-Vegan-Leather-Dungarees-with-Contrast-Stitch-–-Stylish-&-Sustainable-Fashion/6742d39f0c357a5e1b362cc2", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Claudie-Pierlot-Black-Lambskin-Leather-Dungaree---Chic-&-Premium-Style/674abea0e78200a1ff8641a2", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Versace-Bright-Crystal-Eau-de-Toilette-90-ml-%7C-Fresh-Floral-Women's-Perfume/6749a131e78200a1ff863b50", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Maison-Francis-Kurkdjian-Baccarat-Rouge-540-Eau-de-Parfume-%7C-Luxury-Floral-&-Woody-Scent/67499307e78200a1ff863879", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Hermès-Twilly-d'Hermès-Eau-de-Parfum-85ml-–-Bold-Floral-Fragrance-for-Women/67498ffbe78200a1ff8637df", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Miss-Dior-Eau-de-Parfum-100ml-%7C-Elegant-Floral-Fragrance-for-Women---Luxury-Perfume/6749951de78200a1ff863926", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Bleu-De-Chanel-Eau-de-Parfum-100ml-–-Timeless-&-Sophisticated/6742e7f20c357a5e1b362ed2", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Paco-Rabanne-One-Million-Eau-de-Parfum-100ml-–-Luxury-Men's-Fragrance/67499bb6e78200a1ff863a6e", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Musc-Noir-Rose-For-Her-By-Narciso-Rodriguez-Eau-De-Parfum/674998a2e78200a1ff8639b1", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/BVLGARI-Man-In-Black-Eau-De-Parfum-–-Bold-&-Intense-Fragrance/6742ebe20c357a5e1b362fa8", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/-Armani-Privé-Rose-Milano-Eau-de-Toilette-85ml---Luxury-Rose-Perfume-for-Women/67499e92e78200a1ff863af9", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/productdetails/Amouage-Interlude-Eau-de-Parfum-for-Men-–-Bold-&-Sophisticated/67496c56e78200a1ff863359", priority: 1.0, lastmod: "2024-12-01" },


















        
        { path: "/category/MEN", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/category/WOMEN", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/category/KIDS", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/category/Topwear", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/category/Western-Wear", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/category/Ethnic-Wear", priority: 1.0, lastmod: "2024-12-01" },











        { path: "/brand/Calvin-Klein", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/brand/Zara", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/brand/Asos", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/brand/Bvlgari", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/brand/Hermes", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/brand/maison-francis-kurkdjian-paris", priority: 1.0, lastmod: "2024-12-01" },
        { path: "/brand/dior", priority: 1.0, lastmod: "2024-12-01" },
      
    ];


   // Escape special XML characters
   const escapeXml = (string) =>
    string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Build URL entry
const buildUrlEntry = ({ path, lastmod, priority }) => `
<url>
    <loc>${escapeXml(`https://fashionneedles.com${path}`)}</loc>
    <changefreq>${priority === 1.0 ? "weekly" : "weekly"}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${lastmod || new Date().toISOString()}</lastmod>
</url>`;

// Generate static and dynamic URLs
const staticUrls = staticRoutes.map(route =>
    buildUrlEntry({ path: route.path, priority: route.priority })
);

const dynamicUrls = dynamicRoutes.map(route =>
    buildUrlEntry({ path: route.path, lastmod: route.lastmod, priority: route.priority })
);

const allUrls = [...staticUrls, ...dynamicUrls];

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
