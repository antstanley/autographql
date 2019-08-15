"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jwtVerify = _interopRequireDefault(require("@esmodule/jwt-verify"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateOpenId = async (token, jwksOptions) => {
  try {
    const authResponse = await (0, _jwtVerify.default)(token, jwksOptions); // logger('info', `authResponse: ${JSON.stringify(authResponse, null, 2)}`)

    if (!authResponse.error && !authResponse.errors) {
      return {
        valid: true,
        token,
        decoded: authResponse
      };
    } else {
      (0, _utils.logger)('warn', 'dev: Authentication fails');
      return {
        valid: false,
        token
      };
    }
  } catch (error) {
    (0, _utils.logger)('error', `dev: validateOpenId fails with error ${error}`);
    return {
      valid: false,
      token: null,
      decoded: null
    };
  }
};

var _default = validateOpenId;
exports.default = _default;