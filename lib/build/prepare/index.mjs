function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import createFunction from './functions';
import createStructure from './createStructure';

var prepare =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (_ref) {
    var {
      root,
      schema,
      resolvers,
      name,
      functions,
      openid,
      external
    } = _ref;

    try {
      var functionManifest = [];

      if (createStructure(root)) {
        functions.forEach(functionConfig => {
          functionManifest.push(createFunction({
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
  });

  return function prepare(_x) {
    return _ref2.apply(this, arguments);
  };
}();

export default prepare;