"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _prompt = _interopRequireDefault(require("./prompt"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initProject = () => {
  try {
    return (0, _prompt.default)();
  } catch (error) {
    (0, _utils.logger)('error', `Unable to initialise project with error: ${error}`);
  }
};

var _default = initProject;
exports.default = _default;