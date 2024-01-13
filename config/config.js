const nconf = require('nconf');
const json5 = require('json5');
const path = require('path');
const fs = require('fs');

const configDir = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';
const envConfigPath = path.join(configDir, 'config', env + '.json5');

nconf.argv()
  .env(['PORT', 'NODE_ENV'])
  .defaults({
    store: {
      NODE_ENV: 'development',
    },
  });

try {
  fs.accessSync(envConfigPath, fs.constants.R_OK);
  nconf.file(env, { file: envConfigPath, type: 'file', format: json5 });
} catch (err) {
  console.error(`Environment file not found for NODE_ENV -- ${env}`);
}

module.exports = nconf;