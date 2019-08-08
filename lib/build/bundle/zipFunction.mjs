function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import archiver from 'archiver';
import { logger } from '../../utils';
import fs from 'fs';
import path from 'path';

var getFiles =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (rootFolder) {
    try {
      var dirContents = fs.readdirSync(rootFolder);
      var fileList = [];

      for (var i = 0; i < dirContents.length; i++) {
        var workingEntry = path.join(rootFolder, dirContents[i]);
        var stat = fs.lstatSync(workingEntry);

        if (stat.isDirectory()) {
          var files = yield getFiles(workingEntry);

          for (var ii = 0; ii < files.length; ii++) {
            fileList.push(files[ii]);
          }
        } else {
          fileList.push(workingEntry);
        }
      }

      return fileList;
    } catch (error) {
      logger('error', "getFiles: " + error);
    }
  });

  return function getFiles(_x) {
    return _ref.apply(this, arguments);
  };
}();

var createArchive =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (sourceDir, name, provider) {
    var result = false;

    try {
      var normalizedSourceDir = path.normalize(sourceDir);
      var fileList = yield getFiles(normalizedSourceDir);
      var archive = archiver('zip', {
        zlib: {
          level: 9
        }
      });
      var archiveName = path.join(sourceDir, '..', "" + provider + name + ".zip");
      var outputFile = fs.createWriteStream(archiveName);
      outputFile.on('close', function () {
        logger("info", provider + " - " + name + ": " + archive.pointer() + " total bytes zipped to " + name);
        result = true;
      });
      archive.on('ready', function () {
        logger("info", provider + " - " + name + ": Creating Zip for distribution");
      });
      archive.on('error', function (err) {
        logger('error', "createArchive: " + err);
        throw err;
      });
      archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
          logger('warn', "createArchive: " + err);
        } else {
          logger('error', "createArchive: " + err);
          throw err;
        }
      }); // pipe archive data to the file

      archive.pipe(outputFile);
      var rootLength = normalizedSourceDir.length + 1;

      for (var i = 0; i < fileList.length; i++) {
        var fileName = fileList[i].slice(rootLength);
        var stat = fs.lstatSync(fileList[i]);

        if (stat.isDirectory()) {
          archive.directory(fileList[i], fileName);
        } else {
          archive.file(fileList[i], {
            name: fileName
          });
        }
      }

      archive.finalize();
    } catch (error) {
      result = false;
    } finally {
      return result;
    }
  });

  return function createArchive(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // const zipFunction = async functionManifest => {
//   const processedFunctions = []
//   for (let i = 0; i < functionManifest.length; i++) {
//     const archiveName = `${functionManifest[i].functionPath}.zip`
//     const archiveCreated = await createArchive(
//       functionManifest[i].functionPath,
//       archiveName,
//       functionManifest[i].name,
//       functionManifest[i].provider
//     )
//     if (archiveCreated) {
//       processedFunctions.push(functionManifest[i].name)
//     }
//   }
//   return processedFunctions
// }


export default createArchive;