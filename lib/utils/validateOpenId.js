"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jwtVerify = _interopRequireDefault(require("@esmodule/jwt-verify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateOpenId = async (token, jwksOptions) => {
  try {
    const authResponse = await (0, _jwtVerify.default)(token, jwksOptions);

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
};

var _default = validateOpenId;
exports.default = _default;