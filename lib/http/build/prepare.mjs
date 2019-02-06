import { removeFolder, logger } from '../../utils';
import { existsSync, mkdirSync } from 'fs';

const httpPrepare = rootDir => {
  try {
    // logger('info', 'Preparing folder structure for http server')
    const serverDir = `${rootDir}/http`; // check if folder exsists
    // logger('info', `rootDir: ${rootDir}\nserverDir:${serverDir}`)

    if (existsSync(rootDir)) {
      removeFolder(serverDir);
      mkdirSync(serverDir);
    } else {
      mkdirSync(rootDir);
      mkdirSync(serverDir);
    }

    return true;
  } catch (error) {
    logger('error', `httpPrepare error: ${error}`);
    return false;
  }
};

export default httpPrepare;