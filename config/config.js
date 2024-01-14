import nconf from 'nconf';
import json5 from 'json5';
import { normalize, join } from 'path';
import fs from 'fs';

const __dirname = process.cwd();
const configDir = normalize(__dirname + '/.');
const env = process.env.NODE_ENV || 'development';
const envConfigPath = join(configDir, 'config', env + '.json5');

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
  console.error(`Environment file not found for NODE_ENV -- ${env}`,err);
}

export default nconf;