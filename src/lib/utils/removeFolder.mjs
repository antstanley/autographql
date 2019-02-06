import fs from 'fs'

const removeFolder = path => {
  // console.log(`path: ${path}`)
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + '/' + file
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        removeFolder(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
    return true
  } else {
    // console.log('Folder does not exist')
    return true
  }
}

export default removeFolder
