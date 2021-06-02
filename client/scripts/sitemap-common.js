const sitemap = require('nextjs-sitemap-generator');

sitemap({
  baseUrl: 'https://kormerkhoj.com',
  pagesDirectory: process.cwd() + '/.next/server/pages',
  targetDirectory: 'public/sitemap/',
  ignoredExtensions: ['js', 'map'],
  ignoredPaths: ['assets', 'admin', '404', '500'],
  sitemapFilename: 'sitemap-common.xml',
});
