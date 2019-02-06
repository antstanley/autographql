import { parse } from 'graphql';
import { readFileSync } from 'fs';

const validateSDL = async gqlSDL => {
  return parse(gqlSDL);
};

export default (async location => {
  try {
    const gqlSDL = readFileSync(location, 'utf-8');
    return validateSDL(gqlSDL);
  } catch (error) {
    throw new Error(`Unable to parse Schema with error:\n${error}`);
  }
});