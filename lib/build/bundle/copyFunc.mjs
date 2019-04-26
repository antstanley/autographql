function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { copyFileSync, mkdirSync, lstatSync, existsSync } from 'fs';
import { join } from 'path';
import { logger } from '../../utils';
import setDistDir from './setDestDir';

const copyFunc =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (_ref) {
    let output = _ref.output,
        functionConfig = _ref.functionConfig,
        provider = _ref.provider,
        name = _ref.name;

    try {
      logger('info', provider + " - " + name + ": Copying function to distribution folder '" + functionConfig.dist + "'");
      const dist = functionConfig.dist;
      const fileDestDir = setDistDir(dist);
      const fileDest = join(fileDestDir, 'index.js');
      const fileSrc = join(output, 'index.js');

      if (existsSync(fileDestDir)) {
        if (lstatSync(fileDestDir).isDirectory()) {
          copyFileSync(fileSrc, fileDest);
          return true;
        } else {
          logger('warn', "Provider distribution location '" + fileDestDir + "' is not a directory");
          return false;
        }
      } else {
        mkdirSync(fileDestDir);
        copyFileSync(fileSrc, fileDest);
        return true;
      }
    } catch (error) {
      logger('warn', "Unable to copy function to location with error: " + error);
      return false;
    }
  });

  return function copyFunc(_x) {
    return _ref2.apply(this, arguments);
  };
}();

export default copyFunc;