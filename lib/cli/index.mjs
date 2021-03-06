function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { logger } from '../utils';
import config from './config';
import build from '../build';
import http from '../http';
import init from '../init';

var cli =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (args) {
    try {
      var validCommands = ['bundle', 'dev', 'deploy', 'init'];
      var command = args._[0] || null;

      if (command) {
        if (validCommands.includes(command)) {
          if (command === 'init') {
            init();
          } else {
            var configFile = args.config || args.c || 'autographql.config.json';
            var resolvers = args.resolvers || args.r || false;
            var schema = args.schema || args.s || false;
            var functions = args.functions || args.p || false;
            var options = yield config(configFile, resolvers, schema, functions);

            switch (command) {
              case 'bundle':
                build(options);
                break;

              case 'dev':
                http(options);
                break;

              case 'deploy':
                logger('info', 'Deployment not supported at this time');
                break;
            }
          }
        } else {
          logger('warn', "command: \"" + command + "\" not recognised");
        }
      } else {
        logger('warn', "No command specified");
      }
    } catch (error) {
      logger('error', "Error: " + error);
    }
  });

  return function cli(_x) {
    return _ref.apply(this, arguments);
  };
}();

export default cli;