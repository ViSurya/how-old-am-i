const fs = require('fs');
const path = require('path');

const baseUrl = 'https://how-old-am-i.online/';
const currentYear = new Date().getFullYear()-1;

// Function to generate sitemap for all years
const generateYearSitemap = () => {
  let sitemapYearContent = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (let year = currentYear; year >= 1950; year--) {
    // Add URL for year
    const yearUrl = `${baseUrl}?birthdate=${year}`;
    sitemapYearContent += `  <url>\n    <loc>${yearUrl}</loc>\n    <changefreq>yearly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  }

  sitemapYearContent += '</urlset>';
  return sitemapYearContent;
};

// Function to generate sitemap for all months
const generateMonthSitemap = () => {
  let sitemapMonthContent = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (let year = currentYear; year >= 1950; year--) {
    for (let month = 1; month <= 12; month++) {
      const monthString = month.toString().padStart(2, '0');
      // Add URL for year-month
      const yearMonthUrl = `${baseUrl}?birthdate=${year}-${monthString}`;
      sitemapMonthContent += `  <url>\n    <loc>${yearMonthUrl}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }
  }

  sitemapMonthContent += '</urlset>';
  return sitemapMonthContent;
};

// Function to generate sitemap for all years, months, and dates
const generateDateSitemap = () => {
  let sitemapDateContent = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (let year = currentYear; year >= 1950; year--) {
    for (let month = 1; month <= 12; month++) {
      const daysInMonth = new Date(year, month, 0).getDate();
      const monthString = month.toString().padStart(2, '0');
      for (let day = 1; day <= daysInMonth; day++) {
        const dayString = day.toString().padStart(2, '0');
        // Add URL for year-month-date
        const yearMonthDateUrl = `${baseUrl}?birthdate=${year}-${monthString}-${dayString}`;
        sitemapDateContent += `  <url>\n    <loc>${yearMonthDateUrl}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
      }
    }
  }

  sitemapDateContent += '</urlset>';
  return sitemapDateContent;
};

// Function to generate the master sitemap file
const generateMasterSitemap = () => {
  let masterSitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Generate individual sitemaps
  const yearSitemapContent = generateYearSitemap();
  const monthSitemapContent = generateMonthSitemap();
  const dateSitemapContent = generateDateSitemap();

  // Save individual sitemap files
  const yearSitemapPath = path.join(__dirname, 'sitemap_years.xml');
  const monthSitemapPath = path.join(__dirname, 'sitemap_months.xml');
  const dateSitemapPath = path.join(__dirname, 'sitemap_dates.xml');

  fs.writeFileSync(yearSitemapPath, yearSitemapContent, 'utf-8');
  fs.writeFileSync(monthSitemapPath, monthSitemapContent, 'utf-8');
  fs.writeFileSync(dateSitemapPath, dateSitemapContent, 'utf-8');

  console.log(`Year Sitemap generated and saved to ${yearSitemapPath}`);
  console.log(`Month Sitemap generated and saved to ${monthSitemapPath}`);
  console.log(`Date Sitemap generated and saved to ${dateSitemapPath}`);

  // Add entries to master sitemap
  masterSitemapContent += `  <sitemap>\n    <loc>${baseUrl}sitemap_years.xml</loc>\n  </sitemap>\n`;
  masterSitemapContent += `  <sitemap>\n    <loc>${baseUrl}sitemap_months.xml</loc>\n  </sitemap>\n`;
  masterSitemapContent += `  <sitemap>\n    <loc>${baseUrl}sitemap_dates.xml</loc>\n  </sitemap>\n`;

  masterSitemapContent += '</sitemapindex>';

  // Save master sitemap file
  const masterSitemapPath = path.join(__dirname, 'sitemap.xml');
  fs.writeFileSync(masterSitemapPath, masterSitemapContent, 'utf-8');
  console.log(`Master Sitemap generated and saved to ${masterSitemapPath}`);
};

generateMasterSitemap();
