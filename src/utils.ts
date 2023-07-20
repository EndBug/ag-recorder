import moment from 'moment';
import path from 'path';
import config from './config';
import fs from 'fs';

export type camera = (typeof config.devices)[number]['name'];

export function getFilePath(timestamp: timestamp, camera: camera) {
  const { YYYY, MM, DD, HH, mm, ss } = timestamp;
  return path.join(
    getFolderPath(timestamp),
    `${YYYY}-${MM}-${DD}_${HH}-${mm}-${ss}_${camera}`
  );
}

export function getFolderPath({ YYYY, MM, DD }: timestamp) {
  return path.join(config.root_dir, YYYY, MM, DD);
}

export function getRecordingFile(timestamp: timestamp, camera: camera) {
  let fn = getFilePath(timestamp, camera);

  if (!fs.existsSync(fn)) {
    const folder = getFolderPath(timestamp);

    if (fs.existsSync(folder)) {
      const files = fs.readdirSync(folder);
      if (files.length > 0) return path.join(folder, files[0]);
    }
  } else return fn;
}

export function getTimeStamp() {
  const date = moment().utcOffset(1);
  const [YYYY, MM, DD, HH, mm, ss] = date
    .format('YYYY MM DD HH mm ss')
    .split(' ');
  return { YYYY, MM, DD, HH, mm, ss };
}
export type timestamp = ReturnType<typeof getTimeStamp>;
