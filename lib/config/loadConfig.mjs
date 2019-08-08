import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { logger } from '../utils';
import YAML from 'yaml';
import setProjectRoot from './setProjectRoot';
var projectRoot = setProjectRoot();

var loadDefault = () => {
  if (existsSync(join(projectRoot, './autographql.config.json'))) {
    return JSON.parse(readFileSync(join(projectRoot, './autographql.config.json'), 'utf-8'));
  } else {
    if (existsSync(join(projectRoot, './autographql.config.yml'))) {
      return YAML.parse(readFileSync(join(projectRoot, './autographql.config.yml'), 'utf-8'));
    } else {
      logger('warn', 'No autographql.config.json or autographql.config.yml found, using defaults.');
      return null;
    }
  }
};

var checkExtension = filename => {
  if (filename.includes('.yml')) {
    return 'YAML';
  } else {
    if (filename.includes('.json')) {
      return 'JSON';
    } else {
      logger('warn', 'Incorrect file type specified. Please use a .json or .yml file. Using defaults');
      return null;
    }
  }
};

var loadConfig = configFile => {
  if (configFile) {
    var fullFileName = join(projectRoot, configFile);

    if (existsSync(fullFileName)) {
      var fileExt = checkExtension(configFile);

      if (fileExt === 'YAML') {
        return YAML.parse(readFileSync(fullFileName, 'utf-8'));
      } else {
        if (fileExt === 'JSON') {
          return JSON.parse(readFileSync(fullFileName, 'utf-8'));
        } else {
          return null;
        }
      }
    } else {
      logger('warn', 'Config file specified does not exist, searching default config location.');
      return loadDefault();
    }
  } else {
    return loadDefault();
  }
};

export default loadConfig;