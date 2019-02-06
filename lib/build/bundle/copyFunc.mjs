import { copyFileSync, mkdirSync, lstatSync, existsSync } from 'fs';
import { join } from 'path';
import { logger } from '../../utils';
import setDistDir from './setDestDir';

const copyFunc = async (_ref) => {
  let output = _ref.output,
      provider = _ref.provider;

  try {
    logger('info', `${provider.name}: Copying function to distribution folder '${provider.dist}'`);
    const dist = provider.dist;
    const fileDestDir = setDistDir(dist);
    const fileDest = join(fileDestDir, 'index.js');
    const fileSrc = join(output, 'index.js');

    if (existsSync(fileDestDir)) {
      if (lstatSync(fileDestDir).isDirectory()) {
        copyFileSync(fileSrc, fileDest);
        return true;
      } else {
        logger('warn', `Provider distribution location '${fileDestDir}' is not a directory`);
        return false;
      }
    } else {
      mkdirSync(fileDestDir);
      copyFileSync(fileSrc, fileDest);
      return true;
    }
  } catch (error) {
    logger('warn', `Unable to copy function to location with error: ${error}`);
    return false;
  }
};

export default copyFunc;