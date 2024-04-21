const fs = require('fs');
const path = require('path');

const currentYear = new Date().getFullYear();
const baseUrl = 'http://127.0.0.1:3000/how-old-am-i.html';
const sitemapPath = path.join(__dirname, 'sitemap.xml');

const generateSitemap = () => {
  let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add the main page
  sitemapContent += `  <url>\n    <loc>${baseUrl}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

  for (let year = currentYear - 1; year >= 1950; year--) {
    // Add URL for year
    const yearUrl = `${baseUrl}?birthdate=${year}`;
    sitemapContent += `  <url>\n    <loc>${yearUrl}</loc>\n    <changefreq>yearly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;

    for (let month = 1; month <= 12; month++) {
      const monthString = month.toString().padStart(2, '0');

      // Add URL for year-month
      const yearMonthUrl = `${baseUrl}?birthdate=${year}-${monthString}`;
      sitemapContent += `  <url>\n    <loc>${yearMonthUrl}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;

      const daysInMonth = new Date(year, month, 0).getDate();
      const maxDays = month === 2 && isLeapYear(year) ? 29 : daysInMonth;

      for (let day = 1; day <= maxDays; day++) {
        const dayString = day.toString().padStart(2, '0');

        // Add URL for year-month-date
        const yearMonthDateUrl = `${baseUrl}?birthdate=${year}-${monthString}-${dayString}`;
        sitemapContent += `  <url>\n    <loc>${yearMonthDateUrl}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
      }
    }
  }

  sitemapContent += '</urlset>';

  return sitemapContent;
};

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const generateAndSaveSitemap = () => {
  const sitemapContent = generateSitemap();
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
  console.log(`Sitemap generated and saved to ${sitemapPath}`);
};

generateAndSaveSitemap();