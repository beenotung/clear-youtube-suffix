import { exist, rename, scanRecursively } from '@beenotung/tslib/fs';
import * as path from 'path';

export async function main(entryPath: string, dryRun: boolean) {
  return scanRecursively({
    entryPath,
    dereferenceSymbolicLinks: true,
    onFile: async (filename, basename) => {
      if (!basename.includes('kbit')) {
        return;
      }
      // for audio file
      let newBasename = basename.replace(/[_ ]?\([0-9]*kbit.*\)/, '');
      if (newBasename === basename) {
        // for video file
        newBasename = basename.replace(
          /[_ ]?\([0-9]*p_[0-9]*fps_.*kbit\)?/,
          '',
        );
      }
      if (dryRun) {
        console.log(basename, '~~>', newBasename);
        return;
      }
      const dirname = path.dirname(filename);
      const newFilename = path.join(dirname, newBasename);
      if (await exist(newFilename)) {
        console.log('skip overlapping filename:', newFilename);
        return;
      }
      await rename(filename, newFilename);
    },
  });
}
