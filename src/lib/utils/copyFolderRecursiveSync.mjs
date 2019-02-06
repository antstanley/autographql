import fs from 'fs'
import { join, basename } from 'path'

const copyFileSync = (source, target) => {
  let targetFile = target

  // if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = join(target, basename(source))
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source))
}

const copyFolderRecursiveSync = (source, target) => {
  let files = []

  // check if folder needs to be created or integrated
  const targetFolder = target
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }

  // copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach(function (file) {
      const curSource = join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        const newTarget = join(targetFolder, file)
        copyFolderRecursiveSync(curSource, newTarget)
      } else {
        copyFileSync(curSource, targetFolder)
      }
    })
  }
}

export default copyFolderRecursiveSync
