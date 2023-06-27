/** @type import('./src/config').Config */
module.exports = {
  devices: [
    {
      command:
        'ffmpeg -f v4l2 -framerate 30 -video_size 1280x720 -i /dev/video0 -c:v copy ${fn}.mkv',
      name: 'fs',
    },
  ],
  root_dir: '/home/agvideo/Videos',
  port: 3000,
};
