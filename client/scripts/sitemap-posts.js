const fs = require('fs');
const fetch = require('node-fetch');
const { join } = require('path');
const prettier = require('prettier');

const getDate = new Date().toISOString();

const fetchUrl = 'https://kormerkhoj.com/api/post';
const YOUR_AWESOME_DOMAIN = 'https://kormerkhoj.com';

const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });

(async () => {
  const fetchPosts = await fetch(fetchUrl)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const postList = [];
  fetchPosts.forEach((post) => postList.push(post._id));

  const postListSitemap = `
    ${postList
      .map((id) => {
        return `
          <url>
            <loc>${`${YOUR_AWESOME_DOMAIN}/post/${id}`}</loc>
            <lastmod>${getDate}</lastmod>
          </url>`;
      })
      .join('')}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${postListSitemap}
    </urlset>
  `;

  const formattedSitemap = [formatted(generatedSitemap)];

  fs.writeFileSync(
    join(__dirname, '../public/sitemap/sitemap-posts.xml'),
    formattedSitemap.toString(),
    'utf8'
  );
})();
