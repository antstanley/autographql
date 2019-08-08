function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { copyFileSync, lstatSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { logger } from '../../utils';
import setDistDir from './setDestDir';
import mkdirp from 'mkdirp';

var setHostOptions = hostOpts => {
  var hostDefault = {
    version: '2.0',
    functionTimeout: '00:05:00',
    http: {
      routePrefix: '',
      maxOutstandingRequests: 200,
      maxConcurrentRequests: 100,
      dynamicThrottlesEnabled: true
    }
  };
  var returnOpts = hostDefault;

  if (hostOpts) {
    if (typeof hostOpts === 'object') {
      returnOpts = Object.assign(hostDefault, hostOpts);
    } else {
      logger('warn', 'host options are not a valid JSON object, using default options. Refer to https://docs.microsoft.com/en-us/azure/azure-functions/functions-host-json for valid syntax');
    }
  }

  return returnOpts;
};

var setFuncOptions = funcOpts => {
  var funcDefault = {
    bindings: [{
      type: 'httpTrigger',
      direction: 'in',
      authLevel: 'anonymous',
      name: 'req',
      methods: ['get', 'post']
    }, {
      type: 'http',
      direction: 'out',
      name: 'res'
    }]
  };
  var returnOpts = funcDefault;

  if (funcOpts) {
    if (typeof funcOpts === 'object') {
      returnOpts = Object.assign(funcDefault, funcOpts);
    } else {
      logger('warn', 'function options are not a valid JSON object, using default options. Refer to https://github.com/Azure/azure-functions-host/wiki/function.json for valid syntax');
    }
  }

  return returnOpts;
};

var copyFunc =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (_ref) {
    var {
      output,
      functionConfig,
      provider,
      name
    } = _ref;

    try {
      logger('info', provider + " - " + name + ": Copying function to distribution folder '" + functionConfig.dist + "'");
      var {
        dist,
        host,
        func
      } = functionConfig;
      var fileDestDir = join(setDistDir(dist), name);
      var fileDest = join(fileDestDir, 'index.js');
      var fileSrc = join(output, 'index.js');
      var hostOpts = setHostOptions(host);
      var funcOpts = setFuncOptions(func);

      if (existsSync(fileDestDir)) {
        if (lstatSync(fileDestDir).isDirectory()) {
          copyFileSync(fileSrc, fileDest);
          writeFileSync(join(fileDestDir, '../host.json'), JSON.stringify(hostOpts));
          writeFileSync(join(fileDestDir, 'function.json'), JSON.stringify(funcOpts));
          return true;
        } else {
          logger('warn', "Provider distribution location '" + fileDestDir + "' is not a directory");
          return false;
        }
      } else {
        mkdirp.sync(fileDestDir);
        copyFileSync(fileSrc, fileDest);
        writeFileSync(join(fileDestDir, '../host.json'), JSON.stringify(hostOpts));
        writeFileSync(join(fileDestDir, 'function.json'), JSON.stringify(funcOpts));
        return true;
      }
    } catch (error) {
      logger('warn', provider + " - " + name + ": Unable to copy function to location with error: " + error);
      return false;
    }
  });

  return function copyFunc(_x) {
    return _ref2.apply(this, arguments);
  };
}();

export default copyFunc;