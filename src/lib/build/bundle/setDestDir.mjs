import { join } from 'path'

const setDestDir = joinDir => {
  const baseURL = new URL('file://')
  baseURL.pathname = `${process.cwd()}/`
  const projectRoot = join(baseURL.pathname, joinDir)
  return projectRoot
}

export default setDestDir
