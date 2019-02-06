import { join } from 'path'

const templateLocation = relativeLocation => {
  const currDir = new URL(import.meta.url).pathname
  return join(currDir, relativeLocation)
}

export default templateLocation
