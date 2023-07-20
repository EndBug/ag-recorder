export interface Config {
  devices: Array<{
    command: string;
    name: string;
  }>;
  replay: {
    command: string;
    default_camera: string;
    env?: Record<string, string>;
  };
  root_dir: string;
  port: number;
}

const config = require('../config.js') as Config;

export default config;
