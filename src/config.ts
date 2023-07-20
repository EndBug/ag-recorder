export interface Config {
  devices: Array<{
    /** ffmpeg command to start the recording */
    command: string;
    /** Name of the camera */
    name: string;
  }>;
  replay: {
    /** Command to initialize the viewing program (e.g. spawn VLC) */
    startup?: string;
    /** Command to start the replay */
    command: string;
    /** Default camera to start the replay with */
    default_camera: string;
    /** Environment variables to pass to `command` and `startup` */
    env?: Record<string, string>;
  };
  /** Root directory of the video tree */
  root_dir: string;
  /** Port to host the HTTP server on */
  port: number;
}

const config = require('../config.js') as Config;

export default config;
