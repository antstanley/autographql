function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { copyFileSync, lstatSync, existsSync } from 'fs';
import { join } from 'path';
import { logger } from '../../utils';
import setDistDir from './setDestDir';
import mkdirp from 'mkdirp';

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
        dist
      } = functionConfig;
      var fileDestDir = setDistDir(dist);
      var fileDest = join(fileDestDir, 'index.js');
      var fileSrc = join(output, 'index.js');

      if (existsSync(fileDestDir)) {
        if (lstatSync(fileDestDir).isDirectory()) {
          copyFileSync(fileSrc, fileDest);
          return true;
        } else {
          logger('warn', "Provider distribution location '" + fileDestDir + "' is not a directory");
          return false;
        }
      } else {
        mkdirp.sync(fileDestDir);
        copyFileSync(fileSrc, fileDest);
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