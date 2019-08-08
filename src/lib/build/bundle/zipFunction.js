import archiver from 'archiver'
import { logger } from '../../utils'
import fs from 'fs'
import path from 'path'

const getFiles = async rootFolder => {
  try {
    const dirContents = fs.readdirSync(rootFolder)
    const fileList = []
    for (let i = 0; i < dirContents.length; i++) {
      const workingEntry = path.join(rootFolder, dirContents[i])
      const stat = fs.lstatSync(workingEntry)
      if (stat.isDirectory()) {
        const files = await getFiles(workingEntry)
        for (let ii = 0; ii < files.length; ii++) {
          fileList.push(files[ii])
        }
      } else {
        fileList.push(workingEntry)
      }
    }
    return fileList
  } catch (error) {
    logger('error', `getFiles: ${error}`)
  }
}

const createArchive = async (sourceDir, name, provider) => {
  let result = false
  try {
    const fileList = await getFiles(sourceDir)

    const archive = archiver('zip', {
      zlib: { level: 9 }
    })
    const archiveName = path.join(sourceDir, '..', `${provider}${name}.zip`)
    const outputFile = fs.createWriteStream(archiveName)

    outputFile.on('close', function () {
      logger(
        `info`,
        `${provider} - ${name}: ${archive.pointer()} total bytes zipped to ${name}`
      )
      result = true
    })

    archive.on('ready', function () {
      logger(`info`, `${provider} - ${name}: Creating Zip for distribution`)
    })

    archive.on('error', function (err) {
      logger('error', `createArchive: ${err}`)
      throw err
    })

    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        logger('warn', `createArchive: ${err}`)
      } else {
        logger('error', `createArchive: ${err}`)
        throw err
      }
    })

    // pipe archive data to the file
    archive.pipe(outputFile)

    const rootLength = sourceDir.length + 1

    for (let i = 0; i < fileList.length; i++) {
      const fileName = fileList[i].slice(rootLength)

      const stat = fs.lstatSync(fileList[i])
      if (stat.isDirectory()) {
        archive.directory(fileList[i], fileName)
      } else {
        archive.file(fileList[i], { name: fileName })
      }
    }

    archive.finalize()
  } catch (error) {
    result = false
  } finally {
    return result
  }
}

// const zipFunction = async functionManifest => {
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

export default createArchive
