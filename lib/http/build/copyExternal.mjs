import { copyFolderRecursiveSync, logger } from '../../utils';
import { dirname, join } from 'path';
import { existsSync, lstatSync, copyFileSync } from 'fs';

const copyFilesFolders = async (inputDir, output, external) => {
  const source = join(inputDir, external);

  if (existsSync(source)) {
    if (lstatSync(source).isDirectory()) {
      copyFolderRecursiveSync(source, join(output, external));
    } else {
      copyFileSync(source, join(output, external));
    }
  } else {
    logger('warn', `Unable to copy external data. '${source}' does not exist`);
  }
};

const copyExternal = async (_ref) => {
  let external = _ref.external,
      input = _ref.input,
      output = _ref.output;

  try {
    logger('info', `dev: Copying external data`);
    const inputDir = join(dirname(input), 'resolvers');

    if (Array.isArray(external)) {
      const arrLength = external.length;

      for (let i = 0; i < arrLength; i++) {
        await copyFilesFolders(inputDir, output, external[i]);
      }

      return true;
    } else {
      await copyFilesFolders(inputDir, output, external);
    }
  } catch (error) {
    logger('warn', `Unable to copy external data with error:\n${error}`);
  }
};

export default copyExternal;