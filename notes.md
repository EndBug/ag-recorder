v4l2-ctl --list-devices

ffmpeg -f v4l2 -list_formats all -i /dev/video0

https://trac.ffmpeg.org/wiki/Capture/Webcam#Listdevices1

Requirements:

- ffmpeg
- vlc
- nodejs
- v4l-utils

vlc settings:

- Input/Codecs > Demuxers > Image > Duration in seconds <- -1
- Input/Codecs > Demuxers > Image > Real-time <- true
