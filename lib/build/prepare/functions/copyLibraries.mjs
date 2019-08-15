function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { logger, copyFolderRecursiveSync } from '../../../utils';
import { lstatSync, copyFileSync } from 'fs';
import { basename, join } from 'path';
import setTemplateLocation from './setTemplateLocation';

var copyLibraries =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (libArray, functionLocation) {
    var result;

    try {
      for (var i = 0; i < libArray.length; i++) {
        var libLocation = setTemplateLocation(libArray[i]);
        var libStat = lstatSync(libLocation);

        if (libStat.isFile()) {
          copyFileSync(libLocation, join(functionLocation, basename(libLocation)));
        } else {
          if (libStat.isDirectory()) {
            copyFolderRecursiveSync(libLocation, functionLocation);
          } else {
            logger('warn', "copyLibraries: " + libArray[i] + " is not a valid file or directory location");
          }
        }
      }

      result = true;
    } catch (error) {
      logger('error', "copyLibraries: Copying libraries failed.\nError:" + error.message + "\n" + error.stack);
      result = false;
    }

    return result;
  });

  return function copyLibraries(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

export default copyLibraries;