export interface Config {
  devices: Array<{
    command: string;
    name: string;
  }>;
  root_dir: string;
  port: number;
}

const config = require('../config.json') as Config;

export default config;
