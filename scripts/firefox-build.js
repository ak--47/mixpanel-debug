const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const zipper = require('zip-local');
const version = require('../manifest.json').version;

main();

async function main() {
  await exec('npm run build:chrome');

  // Removes non-source files
  const tmpDir = '../tmp';
  if (fs.existsSync(tmpDir)) {
    await fs.rm(tmpDir, { recursive: true });
  }
  await fs.mkdir(tmpDir);
  await fs.move('node_modules', `${tmpDir}/node_modules`);
  await fs.move(`mixpanel-debug-firefox-${version}`, `${tmpDir}/mixpanel-debug-firefox-${version}`);

  zipper.sync.zip('.').compress().save('extension-source.zip');

  // Move project files back
  await fs.move(`${tmpDir}/node_modules`, 'node_modules');
  await fs.move(`${tmpDir}/mixpanel-debug-firefox-${version}`, `mixpanel-debug-firefox-${version}`);

  console.log('Built for Firefox');
}
