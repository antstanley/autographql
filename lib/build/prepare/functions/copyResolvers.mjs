import { copyFolderRecursiveSync, logger } from '../../../utils';
import { lstatSync } from 'fs';
import { dirname } from 'path';

var copyResolvers = (build, location) => {
  try {
    var fileStat = lstatSync(location);

    if (fileStat.isDirectory()) {
      copyFolderRecursiveSync(location, build);
      return true;
    } else {
      if (fileStat.isFile()) {
        copyFolderRecursiveSync(dirname(location), build);
        return true;
      } else {
        logger('warn', 'Resolver location is not a directory');
        return false;
      }
    }
  } catch (error) {
    logger('error', "copyResolvers error: " + error);
    return false;
  }
};

export default copyResolvers;