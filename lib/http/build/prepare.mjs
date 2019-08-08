import { removeFolder, logger } from '../../utils';
import { existsSync, mkdirSync } from 'fs';

var httpPrepare = rootDir => {
  try {
    var serverDir = rootDir + "/http"; // check if folder exsists

    if (existsSync(rootDir)) {
      removeFolder(serverDir);
      mkdirSync(serverDir);
    } else {
      mkdirSync(rootDir);
      mkdirSync(serverDir);
    }

    return true;
  } catch (error) {
    logger('error', "httpPrepare error: " + error);
    return false;
  }
};

export default httpPrepare;