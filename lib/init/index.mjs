import prompt from './prompt';
import { logger } from '../utils';

var initProject = () => {
  try {
    return prompt();
  } catch (error) {
    logger('error', "Unable to initialise project with error: " + error);
  }
};

export default initProject;