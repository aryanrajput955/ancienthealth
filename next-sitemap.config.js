/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.ancienthealth.in/',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/golden-nectar-honey'),
    await config.transform(config, '/lemongrass-infusion-tea'),
    await config.transform(config, '/mandua-bites')
  
  ],
};
