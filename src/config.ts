const config = {
  devices: [
    {
      framerate: 30,
      video_size: '1280x720',
      input: '/dev/video0',
      name: 'fs',
    },
  ],
  root_dir: '/home/agvideo/Videos',
  port: 3000,
} as const;

export default config;
