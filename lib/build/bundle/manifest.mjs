function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { existsSync, readdirSync, lstatSync } from 'fs';
export default
/*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(function* (rootDir) {
    const functionsDir = rootDir + "/build/functions";
    const rootArray = readdirSync(functionsDir);
    if (rootArray.length <= 0) throw new Error('Invalid root path');
    let manifestArray = [];
    let i;

    for (i = 0; i < rootArray.length; i++) {
      const functionRoot = functionsDir + "/" + rootArray[i]; // console.log(`iteration: ${i}, root: ${functionRoot}`)

      if (lstatSync(functionRoot).isDirectory()) {
        if (existsSync(functionRoot + "/index.mjs")) {
          manifestArray.push(rootArray[i]); // console.log(`${rootArray[i]} added to manifest`)
        }
      }
    }

    return manifestArray;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();