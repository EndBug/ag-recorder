import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { spawn } from 'child_process';

import config from './config';
import { mkdirpSync } from 'mkdirp';
import {
  camera,
  getFilePath,
  getFolderPath,
  getTimeStamp,
  timestamp,
} from './utils';

const app = express();

/** The timestamp of the last batch of saved videos */
let lastSaved: timestamp | undefined;
/** The timestamp of the videos that are currently being recorded */
let recording: timestamp | undefined;
/** A map of the current encoding processes, one for each device */
let processes = {} as Record<camera, ReturnType<typeof spawn>>;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/start', (req, res) => {
  if (recording !== undefined)
    return res.status(409).send('Already recording.');

  recording = getTimeStamp();

  mkdirpSync(getFolderPath(recording));

  console.log(`Starting recording...`);

  config.devices.forEach((device) => {
    if (!recording) return;

    const fn = getFilePath(recording, device.name);

    const command = device.command.replace(/\$\{fn\}/g, fn).split(' ');

    const process = spawn(command[0], command.slice(1));
    process.on('spawn', () => {
      console.log(`Started: ${fn}`);
    });
    process.stderr?.on('data', (data) => {
      console.error(`Error while starting ${fn}: ${data.toString()}`);
    });

    processes[device.name] = process;
  });

  res.status(200).send();
});

app.post('/stop', (req, res) => {
  if (recording !== undefined) {
    console.log(`Stopping recording...`);

    const errors: string[] = [];

    Object.entries(processes).forEach(([cam, process]) => {
      try {
        if (!recording) return;

        const fn = getFilePath(recording, cam as camera);
        const killed = process.kill();

        if (killed) console.log(`Stopped: ${fn}`);
        else errors.push(`Couldn't kill process while stopping ${fn}`);
      } catch (e) {
        errors.push(`Error while stopping video from cam ${cam}: ${e}`);
      }
    });

    lastSaved = recording;
    recording = undefined;

    if (errors.length > 0)
      res
        .status(500)
        .send(
          `${errors.length} errors while stopping recording:\n` +
            errors.map((s) => '- ' + s).join('\n')
        );
    else res.status(200).send('Recording stopped.');
  } else res.status(200).send('No recording in progress.');
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
