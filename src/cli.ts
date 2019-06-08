#!/usr/bin/env node
import { catchMain } from '@beenotung/tslib/node';
import { main } from './core';

const name = 'clear-youtube-suffix';
const version = 'v1.0.0';
let run = true;

function quit(code = 0) {
  process.exit(code);
  run = false;
}

// arguments
let entryPath: string;
let dryRun = true;
let dereferenceSymbolicLinks = false;

for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  switch (arg) {
    case '-h':
    case '--help':
      console.log(
        `
${name} ${version}

Usage: ${name} [options] [path]

Options:
  -h, --help      print help message
  -v, --version   print ${name} version
  -r, --run       do actual renaming (default mode is dryRun)
  -f, --follow    follow symbolic links
`.trim(),
      );
      quit();
      break;
    case '-v':
    case '--version':
      console.log(version);
      quit();
      break;
    case '-r':
    case '--run':
      dryRun = false;
      break;
    case '-f':
    case '--follow':
      dereferenceSymbolicLinks = true;
      break;
    default:
      if (!entryPath) {
        entryPath = arg;
        break;
      }
      console.error('unknown argument:', arg);
      quit(1);
  }
}

if (run) {
  // entryPath = entryPath || path.join(process.env.HOME, 'Music');
  entryPath = entryPath || '.';
  catchMain(main({ entryPath, dryRun, dereferenceSymbolicLinks }));
}
