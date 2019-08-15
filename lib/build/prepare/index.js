"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _functions = _interopRequireDefault(require("./functions"));

var _createStructure = _interopRequireDefault(require("./createStructure"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prepare = async ({
  root,
  schema,
  resolvers,
  name,
  functions,
  openid,
  external
}) => {
  try {
    const functionManifest = [];

    if ((0, _createStructure.default)(root)) {
      functions.forEach(functionConfig => {
        functionManifest.push((0, _functions.default)({
          root,
          schema,
          resolvers,
          functionName: name,
          functionConfig,
          openid,
          external
        }));
      });
    }

    return functionManifest;
  } catch (error) {
    throw new Error(error);
  }
};

var _default = prepare;
exports.default = _default;