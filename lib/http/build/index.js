"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _utils = require("../../utils");

var _bundleResolvers = _interopRequireDefault(require("./bundleResolvers"));

var _prepare = _interopRequireDefault(require("./prepare"));

var _copyExternal = _interopRequireDefault(require("./copyExternal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildHttp = ({
  root,
  schema,
  resolvers,
  external,
  rollup
}) => {
  try {
    const buildDestination = root.endsWith('/') ? `${root}http` : `${root}/http`;
    const resolverDest = `${buildDestination}/resolvers`;

    if ((0, _prepare.default)(root)) {
      (0, _fs.mkdirSync)(resolverDest);
      (0, _utils.logger)('info', `dev: Exporting schema`);
      const schemaLoc = `${buildDestination}/schema.gql`;
      (0, _fs.copyFileSync)(schema, schemaLoc);
      (0, _utils.logger)('info', `dev: Exporting resolver`);
      const resolverLoc = `${resolverDest}/index.js`;

      if ((0, _bundleResolvers.default)(resolvers, resolverLoc, rollup)) {
        if (external) {
          (0, _copyExternal.default)({
            external,
            output: resolverDest,
            input: resolvers
          });
        }

        return {
          schemaLoc,
          resolverLoc
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    (0, _utils.logger)('error', `Unable to build http server with error: \n${error}`);
    return null;
  }
};

var _default = buildHttp;
exports.default = _default;