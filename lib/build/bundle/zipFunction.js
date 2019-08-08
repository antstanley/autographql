"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _archiver = _interopRequireDefault(require("archiver"));

var _utils = require("../../utils");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFiles = async rootFolder => {
  try {
    const dirContents = _fs.default.readdirSync(rootFolder);

    const fileList = [];

    for (let i = 0; i < dirContents.length; i++) {
      const workingEntry = _path.default.join(rootFolder, dirContents[i]);

      const stat = _fs.default.lstatSync(workingEntry);

      if (stat.isDirectory()) {
        const files = await getFiles(workingEntry);

        for (let ii = 0; ii < files.length; ii++) {
          fileList.push(files[ii]);
        }
      } else {
        fileList.push(workingEntry);
      }
    }

    return fileList;
  } catch (error) {
    (0, _utils.logger)('error', `getFiles: ${error}`);
  }
};

const createArchive = async (sourceDir, name, provider) => {
  let result = false;

  try {
    const normalizedSourceDir = _path.default.normalize(sourceDir);

    const fileList = await getFiles(normalizedSourceDir);
    const archive = (0, _archiver.default)('zip', {
      zlib: {
        level: 9
      }
    });

    const archiveName = _path.default.join(sourceDir, '..', `${provider}${name}.zip`);

    const outputFile = _fs.default.createWriteStream(archiveName);

    outputFile.on('close', function () {
      (0, _utils.logger)(`info`, `${provider} - ${name}: ${archive.pointer()} total bytes zipped to ${name}`);
      result = true;
    });
    archive.on('ready', function () {
      (0, _utils.logger)(`info`, `${provider} - ${name}: Creating Zip for distribution`);
    });
    archive.on('error', function (err) {
      (0, _utils.logger)('error', `createArchive: ${err}`);
      throw err;
    });
    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        (0, _utils.logger)('warn', `createArchive: ${err}`);
      } else {
        (0, _utils.logger)('error', `createArchive: ${err}`);
        throw err;
      }
    }); // pipe archive data to the file

    archive.pipe(outputFile);
    const rootLength = normalizedSourceDir.length + 1;

    for (let i = 0; i < fileList.length; i++) {
      const fileName = fileList[i].slice(rootLength);

      const stat = _fs.default.lstatSync(fileList[i]);

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
}; // const zipFunction = async functionManifest => {
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


var _default = createArchive;
exports.default = _default;