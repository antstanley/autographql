"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (level, message) => {
  const nowDateTime = new Date();
  const nowString = nowDateTime.toISOString().substr(11, 12);

  switch (level) {
    case 'info':
      console.log(`${_chalk.default.gray(`[${nowString}]`)} ${_chalk.default.green('\u2713')} ${_chalk.default.cyan(message)}`);
      break;

    case 'action':
      console.log(`${_chalk.default.gray(`[${nowString}]`)} ${_chalk.default.green('\u2713')} ${_chalk.default.cyan(message)}`);
      break;

    case 'warn':
      console.log(`${_chalk.default.gray(`[${nowString}]`)} ${_chalk.default.yellow(message)}`);
      break;

    case 'error':
      console.log(`${_chalk.default.gray(`[${nowString}]`)} ${_chalk.default.red('\u274C')} ${_chalk.default.cyan(message)}`);
      break;

    default:
      console.log(`${_chalk.default.gray(`[${nowString}]`)} ${_chalk.default.blue(message)}`);
  }
};

var _default = logger;
exports.default = _default;