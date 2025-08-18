/** @type {import('next-sitemap').IConfig} */
const fg = require('fast-glob');

const SITE = 'https://calcolo.online';

module.exports = {
  siteUrl: SITE,
  generateRobotsTxt: false,
  outDir: 'public',
  sitemapSize: 5000,
  trailingSlash: false,
  
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/en', '/en/*', '/es', '/es/*', '/fr', '/fr/*'] },
    ],
  },
  transform: async (config, url) => ({
    loc: `${config.siteUrl}${url}`,
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString(),
  }),
  additionalPaths: async () => {
    const extra = [];
    const mdFiles = await fg(['content/**/*.md', 'content/**/*.mdx'], { dot: false });

    for (const file of mdFiles) {
      const rel = file
        .replace(/^content\//, '')
        .replace(/\.mdx?$/i, '')
        .replace(/\/index$/i, '');
      extra.push({ loc: `/${rel}`, lastmod: new Date().toISOString() });
    }
    return extra;
  },
};
