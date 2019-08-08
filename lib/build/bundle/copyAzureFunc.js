"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _utils = require("../../utils");

var _setDestDir = _interopRequireDefault(require("./setDestDir"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setHostOptions = hostOpts => {
  const hostDefault = {
    version: '2.0',
    functionTimeout: '00:05:00',
    http: {
      routePrefix: '',
      maxOutstandingRequests: 200,
      maxConcurrentRequests: 100,
      dynamicThrottlesEnabled: true
    }
  };
  let returnOpts = hostDefault;

  if (hostOpts) {
    if (typeof hostOpts === 'object') {
      returnOpts = Object.assign(hostDefault, hostOpts);
    } else {
      (0, _utils.logger)('warn', 'host options are not a valid JSON object, using default options. Refer to https://docs.microsoft.com/en-us/azure/azure-functions/functions-host-json for valid syntax');
    }
  }

  return returnOpts;
};

const setFuncOptions = funcOpts => {
  const funcDefault = {
    bindings: [{
      type: 'httpTrigger',
      direction: 'in',
      authLevel: 'anonymous'
    }, {
      type: 'http',
      direction: 'out'
    }]
  };
  let returnOpts = funcDefault;

  if (funcOpts) {
    if (typeof funcOpts === 'object') {
      returnOpts = Object.assign(funcDefault, funcOpts);
    } else {
      (0, _utils.logger)('warn', 'function options are not a valid JSON object, using default options. Refer to https://github.com/Azure/azure-functions-host/wiki/function.json for valid syntax');
    }
  }

  return returnOpts;
};

const copyFunc = async ({
  output,
  functionConfig,
  provider,
  name
}) => {
  try {
    (0, _utils.logger)('info', `${provider} - ${name}: Copying function to distribution folder '${functionConfig.dist}'`);
    const dist = functionConfig.dist,
          host = functionConfig.host,
          func = functionConfig.func;
    const fileDestDir = (0, _path.join)((0, _setDestDir.default)(dist), name);
    const fileDest = (0, _path.join)(fileDestDir, 'index.js');
    const fileSrc = (0, _path.join)(output, 'index.js');
    const hostOpts = setHostOptions(host);
    const funcOpts = setFuncOptions(func);

    if ((0, _fs.existsSync)(fileDestDir)) {
      if ((0, _fs.lstatSync)(fileDestDir).isDirectory()) {
        (0, _fs.copyFileSync)(fileSrc, fileDest);
        (0, _fs.writeFileSync)((0, _path.join)(fileDestDir, '../host.json'), JSON.stringify(hostOpts));
        (0, _fs.writeFileSync)((0, _path.join)(fileDestDir, 'function.json'), JSON.stringify(funcOpts));
        return true;
      } else {
        (0, _utils.logger)('warn', `Provider distribution location '${fileDestDir}' is not a directory`);
        return false;
      }
    } else {
      _mkdirp.default.sync(fileDestDir);

      (0, _fs.copyFileSync)(fileSrc, fileDest);
      (0, _fs.writeFileSync)((0, _path.join)(fileDestDir, '../host.json'), JSON.stringify(hostOpts));
      (0, _fs.writeFileSync)((0, _path.join)(fileDestDir, 'function.json'), JSON.stringify(funcOpts));
      return true;
    }
  } catch (error) {
    (0, _utils.logger)('warn', `${provider} - ${name}: Unable to copy function to location with error: ${error}`);
    return false;
  }
};

var _default = copyFunc;
exports.default = _default;