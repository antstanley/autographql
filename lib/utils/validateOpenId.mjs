function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import authenticate from '@esmodule/jwt-verify';

var validateOpenId =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (token, jwksOptions) {
    try {
      var authResponse = yield authenticate(token, jwksOptions);

      if (!authResponse.error && !authResponse.errors) {
        return {
          valid: true,
          token,
          decoded: authResponse
        };
      } else {
        return {
          valid: false,
          token
        };
      }
    } catch (error) {
      return {
        valid: false,
        token: null,
        decoded: null
      };
    }
  });

  return function validateOpenId(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

export default validateOpenId;