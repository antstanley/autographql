import { existsSync, readdirSync } from 'fs'

export default async rootDir => {
  const functionsDir = `${rootDir}/build/functions`
  const rootArray = readdirSync(functionsDir)

  if (rootArray.length <= 0) throw new Error('Invalid root path')

  const manifestArray = []
  let i

  for (i = 0; i < rootArray.length; i++) {
    const functionRoot = `${functionsDir}/${rootArray[i]}`

    if (existsSync(functionRoot)) {
      manifestArray.push(rootArray[i])
    }
  }

  return manifestArray
}
