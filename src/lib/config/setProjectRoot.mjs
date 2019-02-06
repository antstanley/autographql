const setProjectRoot = () => {
  const baseURL = new URL('file://')
  baseURL.pathname = `${process.cwd()}/`
  const projectRoot = new URL(baseURL).pathname
  return projectRoot
}

export default setProjectRoot
