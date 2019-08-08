import fs from 'fs';
import { join, basename } from 'path';

var copyFileSync = (source, target) => {
  var targetFile = target; // if target is a directory a new file with the same name will be created

  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = join(target, basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
};

var copyFolderRecursiveSync = (source, target) => {
  var files = []; // check if folder needs to be created or integrated

  var targetFolder = target;

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  } // copy


  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = join(source, file);

      if (fs.lstatSync(curSource).isDirectory()) {
        var newTarget = join(targetFolder, file);
        copyFolderRecursiveSync(curSource, newTarget);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
};

export default copyFolderRecursiveSync;