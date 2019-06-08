#!/usr/bin/env node
import { catchMain } from '@beenotung/tslib/node';
import * as path from 'path';
import { main } from './core';

let entryPath: string;
let dryRun = true;

for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  switch (arg) {
    case '-h':
    case '--help':
      console.log();
      process.exit();
      break;
    case '-r':
    case '--run':
      dryRun = false;
      break;
    default:
      if (!entryPath) {
        entryPath = arg;
        break;
      }
      console.error('unknown argument:', arg);
      process.exit(1);
  }
}

entryPath = entryPath || path.join(process.env.HOME, 'Music');
catchMain(main(entryPath, dryRun));
