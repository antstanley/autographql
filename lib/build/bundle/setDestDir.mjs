import { join } from 'path';

var setDestDir = joinDir => {
  var baseURL = new URL('file://');
  baseURL.pathname = process.cwd() + "/";
  var projectRoot = join(baseURL.pathname, joinDir);
  return projectRoot;
};

export default setDestDir;