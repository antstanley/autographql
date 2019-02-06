"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (level, message) => {
  switch (level) {
    case 'info':
      console.log(_chalk.default.cyan(`\u2713 ${message}`));
      break;

    case 'action':
      console.log(_chalk.default.green(`\u2713 ${message}`));
      break;

    case 'warn':
      console.log(_chalk.default.yellow(message));
      break;

    case 'error':
      console.log(_chalk.default.red(message));
      break;

    default:
      console.log(_chalk.default.blue(message));
  }
};

var _default = logger;
exports.default = _default;