function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import config from '../../config';
import validate from './validate';

const buildConfig =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (configFile, resolvers, schema, functions) {
    if (validate(resolvers, schema, functions)) {
      const options = configFile ? yield config(configFile) : yield config('');

      if (schema) {
        options.schema = schema;
      }

      if (resolvers) {
        options.resolvers = resolvers;
      }

      if (functions) {
        options.providers = functions;
      }

      return options;
    } else {
      return false;
    }
  });

  return function buildConfig(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

export default buildConfig;