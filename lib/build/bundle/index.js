"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bundleProject = _interopRequireDefault(require("./bundleProject"));

var _copyFunc = _interopRequireDefault(require("./copyFunc"));

var _copyExternal = _interopRequireDefault(require("./copyExternal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bundleGraphQL = async functionManifest => {
  try {
    const manifest = functionManifest;
    const arrLength = manifest.length;

    for (let i = 0; i < arrLength; i++) {
      const options = manifest[i];
      const bundleSuccess = await (0, _bundleProject.default)(options);

      if (bundleSuccess) {
        if (options.provider) {
          const input = options.input,
                output = options.output,
                provider = options.provider,
                external = options.external;

          if (provider.dist) {
            await (0, _copyFunc.default)({
              provider,
              output
            });
          }

          if (external) {
            await (0, _copyExternal.default)({
              provider,
              external,
              input,
              output
            });
          }
        }
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

var _default = bundleGraphQL;
exports.default = _default;