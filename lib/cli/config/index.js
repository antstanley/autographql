"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../../config"));

var _validate = _interopRequireDefault(require("./validate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildConfig = async (configFile, resolvers, schema, functions) => {
  if ((0, _validate.default)(resolvers, schema, functions)) {
    const options = configFile ? await (0, _config.default)(configFile) : await (0, _config.default)('');

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
};

var _default = buildConfig;
exports.default = _default;