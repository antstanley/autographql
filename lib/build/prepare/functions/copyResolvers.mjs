import { copyFolderRecursiveSync, logger } from '../../../utils';
import { lstatSync } from 'fs';

var copyResolvers = (build, location) => {
  try {
    if (lstatSync(location).isDirectory()) {
      copyFolderRecursiveSync(location, build);
      return true;
    } else {
      logger('warn', 'Resolver location is not a directory');
      return false;
    }
  } catch (error) {
    logger('error', "copyResolvers error: " + error);
    return false;
  }
};

export default copyResolvers;