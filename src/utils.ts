import moment from 'moment';
import path from 'path';
import config from './config';

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

export function getTimeStamp() {
  const date = moment().utcOffset(1);
  const [YYYY, MM, DD, HH, mm, ss] = date
    .format('YYYY MM DD HH mm ss')
    .split(' ');
  return { YYYY, MM, DD, HH, mm, ss };
}
export type timestamp = ReturnType<typeof getTimeStamp>;
