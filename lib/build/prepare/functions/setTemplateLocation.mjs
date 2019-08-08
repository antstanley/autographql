import { join } from 'path';

var templateLocation = relativeLocation => {
  var currDir = new URL(import.meta.url).pathname;
  return join(currDir, relativeLocation);
};

export default templateLocation;