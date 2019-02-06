const path = require('path')

const setDestDir = joinDir => {
  const baseURL = new URL('file://')
  baseURL.pathname = `${process.cwd()}/`
  const projectRoot = path.join(baseURL.pathname, joinDir)
  return projectRoot
}

module.exports = setDestDir
