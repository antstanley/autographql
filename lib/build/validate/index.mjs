function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { parse } from 'graphql';
import { readFileSync } from 'fs';

const validateSDL =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (gqlSDL) {
    return parse(gqlSDL);
  });

  return function validateSDL(_x) {
    return _ref.apply(this, arguments);
  };
}();

export default
/*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(function* (location) {
    try {
      const gqlSDL = readFileSync(location, 'utf-8');
      return validateSDL(gqlSDL);
    } catch (error) {
      throw new Error("Unable to parse Schema with error:\n" + error);
    }
  });

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
})();