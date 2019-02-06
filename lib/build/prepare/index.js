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
  providers,
  external
}) => {
  try {
    let functions = [];

    if ((0, _createStructure.default)(root)) {
      providers.forEach(provider => {
        functions.push((0, _functions.default)({
          root,
          schema,
          resolvers,
          functionName: name,
          provider,
          external
        }));
      });
    }

    return functions;
  } catch (error) {
    throw new Error(error);
  }
};

var _default = prepare;
exports.default = _default;