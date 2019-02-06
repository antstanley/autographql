"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _yaml = _interopRequireDefault(require("yaml"));

var _fs = require("fs");

var _setTemplateLocation = _interopRequireDefault(require("./setTemplateLocation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { moduleRoot } from '../../../utils'
const prepareDeploy = ({
  name,
  functionName,
  functionLocation
}) => {
  try {
    const serverlessTemplateLocation = (0, _setTemplateLocation.default)(`../../../../template/functions/${name}/serverless.yml`);

    const serverless = _yaml.default.parse((0, _fs.readFileSync)(serverlessTemplateLocation, 'utf-8'));

    if (serverless) {
      serverless.name = functionName;
      (0, _fs.writeFileSync)(`${functionLocation}/serverless.yml`, _yaml.default.stringify(serverless));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

var _default = prepareDeploy;
exports.default = _default;