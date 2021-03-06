"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _copyResolvers = _interopRequireDefault(require("./copyResolvers"));

var _copyLibraries = _interopRequireDefault(require("./copyLibraries"));

var _fs = require("fs");

var _path = require("path");

var _utils = require("../../../utils");

var _setTemplateLocation = _interopRequireDefault(require("./setTemplateLocation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createFunction = ({
  root,
  schema,
  resolvers,
  functionName,
  functionConfig,
  openid,
  external
}) => {
  try {
    const provider = functionConfig.provider;
    const name = functionConfig.name ? functionConfig.name : functionName;
    const buildDestination = `${root}/build/functions/${provider}`;
    const functionLocation = `${buildDestination}/${name}`;
    const resolverLocation = `${functionLocation}/resolvers`; // create function and resolvers folder

    (0, _fs.mkdirSync)(buildDestination);
    (0, _fs.mkdirSync)(functionLocation);
    (0, _fs.mkdirSync)(resolverLocation);
    (0, _utils.logger)('info', `${provider} - ${name}: Exporting resolvers`); // copy resolvers to resolver folder

    if ((0, _copyResolvers.default)(resolverLocation, resolvers)) {
      // create function index.js and copy it
      const templateLocation = (0, _setTemplateLocation.default)(`../../../../template/functions/${provider}/index.template.mjs`);
      const schemaFile = (0, _fs.readFileSync)(schema, 'utf-8');
      const functionTemplate = (0, _fs.readFileSync)(templateLocation, 'utf-8');
      const providerFunction = functionTemplate.replace(/__SDL__/g, schemaFile);

      if (!providerFunction) {
        throw new Error('Unable to inject schema into function');
      }

      (0, _utils.logger)('info', `${provider} - ${name}: Writing function`); // write function to build directory

      (0, _fs.writeFileSync)(`${functionLocation}/index.mjs`, providerFunction); // write function configuration options

      const config = {
        openid
      };
      (0, _fs.writeFileSync)((0, _path.join)(functionLocation, 'config.json'), JSON.stringify(config)); // copy default libraries needed by autographql

      const libArray = ['../../../utils/validateOpenId.mjs'];
      const copyLibResult = (0, _copyLibraries.default)(libArray, functionLocation);

      if (copyLibResult) {
        return {
          name,
          provider,
          distName: `${root}/dist/functions/${provider}`,
          input: `${functionLocation}/index.mjs`,
          output: `${root}/dist/functions/${provider}/${name}/`,
          functionConfig,
          openid,
          external
        };
      } else {
        return null;
      }
    }
  } catch (error) {
    (0, _utils.logger)('error', `createFunction: Unable to create function with Error: ${error}`);
    return null;
  }
};

var _default = createFunction;
exports.default = _default;