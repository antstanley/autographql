var setProjectRoot = () => {
  var baseURL = new URL('file://');
  baseURL.pathname = process.cwd() + "/";
  var projectRoot = new URL(baseURL).pathname;
  return projectRoot;
};

export default setProjectRoot;