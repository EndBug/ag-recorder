/** @type import('./src/config').Config */
module.exports = {
  devices: [
    {
      command:
        'ffmpeg -f v4l2 -framerate 30 -video_size 1280x720 -i /dev/video0 -c:v copy ${fn}',
      name: 'fs',
    },
  ],
  replay: {
    startup: 'vlc --no-osd --fullscreen /home/agvideo/logo.png',
    command: 'vlc --fullscreen ${fn} && vlc --playlist-enqueue --no-osd /home/agvideo/logo.png',
    default_camera: 'fs',
    env: {
      DISPLAY: ':0',
    }
  },
  root_dir: '/home/agvideo/Videos',
  port: 3000,
};
