"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bundleProject = _interopRequireDefault(require("./bundleProject"));

var _copyFunc = _interopRequireDefault(require("./copyFunc"));

var _copyExternal = _interopRequireDefault(require("./copyExternal"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bundleGraphQL = async (functionManifest, rollupConfig) => {
  try {
    const manifest = functionManifest;
    const arrLength = manifest.length;

    for (let i = 0; i < arrLength; i++) {
      const options = manifest[i];
      const bundleSuccess = await (0, _bundleProject.default)(options, rollupConfig);

      if (bundleSuccess) {
        if (options.functionConfig) {
          const input = options.input,
                output = options.output,
                functionConfig = options.functionConfig,
                external = options.external,
                provider = options.provider,
                name = options.name;

          if (functionConfig.dist) {
            await (0, _copyFunc.default)({
              functionConfig,
              output,
              provider,
              name
            });
          }

          if (external) {
            await (0, _copyExternal.default)({
              provider,
              name,
              external,
              input,
              output,
              functionConfig
            });
          }
        }
      }
    }
  } catch (error) {
    (0, _utils.logger)('error', error);
  }
};

var _default = bundleGraphQL;
exports.default = _default;