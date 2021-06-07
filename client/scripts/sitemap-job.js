const nodeCron = require('node-cron');
const shell = require('shelljs');

console.log('--- Cron Job Started ---');
nodeCron.schedule('0 0 * * *', () => {
  shell.exec(
    'node ./scripts/sitemap-common.js && node ./scripts/sitemap-posts.js && node ./scripts/compress.js'
  );

  console.log(`${new Date().toDateString()} - New sitemap generated`);
});
