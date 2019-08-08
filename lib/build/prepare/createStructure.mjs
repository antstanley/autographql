import { removeFolder, logger } from '../../utils';
import { existsSync, mkdirSync } from 'fs';

var createStructure = rootDir => {
  try {
    logger('info', 'Creating directory structure ...'); // check if folder exsists

    if (existsSync(rootDir)) {
      removeFolder(rootDir);
    } // create directory strucuture


    mkdirSync("" + rootDir);
    mkdirSync(rootDir + "/build");
    mkdirSync(rootDir + "/build/functions");
    mkdirSync(rootDir + "/dist");
    mkdirSync(rootDir + "/dist/functions");
    return true;
  } catch (error) {
    logger('error', "createStructure error: " + error);
    return false;
  }
};

export default createStructure;