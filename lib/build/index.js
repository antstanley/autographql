"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate"));

var _prepare = _interopRequireDefault(require("./prepare"));

var _bundle = _interopRequireDefault(require("./bundle"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const build = async options => {
  try {
    await (0, _validate.default)(options.schema);
    const functionManifest = await (0, _prepare.default)(options);

    if (!functionManifest) {
      (0, _utils.logger)('error', 'Unable to prepare project root'); // throw new Error('Unable to prepare project root')
    } else {
      const rollup = options.rollup;
      return (0, _bundle.default)(functionManifest, rollup);
    }
  } catch (error) {
    (0, _utils.logger)('error', `Bundle process failed: ${error}\n${error.stack}`);
  }
};

var _default = build;
exports.default = _default;