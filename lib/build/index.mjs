function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import validate from './validate';
import prepare from './prepare';
import bundle from './bundle';
import { logger } from '../utils';

var build =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (options) {
    try {
      yield validate(options.schema);
      var functionManifest = yield prepare(options);

      if (!functionManifest) {
        logger('error', 'Unable to prepare project root'); // throw new Error('Unable to prepare project root')
      } else {
        var {
          rollup
        } = options;
        return bundle(functionManifest, rollup);
      }
    } catch (error) {
      logger('error', "Bundle process failed: " + error + "\n" + error.stack);
    }
  });

  return function build(_x) {
    return _ref.apply(this, arguments);
  };
}();

export default build;