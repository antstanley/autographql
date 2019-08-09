import { mkdirSync, copyFileSync } from 'fs'
import { logger } from '../../utils'
import bundleResolvers from './bundleResolvers'
import prepare from './prepare'
import copyExternal from './copyExternal'

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max))
}

const buildHttp = async ({ root, schema, resolvers, external, rollup }) => {
  try {
    const buildDestination = root.endsWith('/') ? `${root}http` : `${root}/http`
    const resolverDest = `${buildDestination}/resolvers`

    if (prepare(root)) {
      mkdirSync(resolverDest)
      logger('info', `dev: Exporting schema`)

      const schemaLoc = `${buildDestination}/schema.gql`

      copyFileSync(schema, schemaLoc)

      logger('info', `dev: Exporting resolver`)
      const randomIdx = getRandomInt(9999)
      const resolverLoc = `${resolverDest}/index${randomIdx}.js`

      if (external) {
        if (Array.isArray(external)) {
          if (external.length > 0) {
            await copyExternal({
              external,
              output: resolverDest,
              input: resolvers
            })
          }
        }
      }

      const bundleResponse = await bundleResolvers(
        resolvers,
        resolverLoc,
        rollup
      )

      if (bundleResponse) {
        return { schemaLoc, resolverLoc }
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (error) {
    logger('error', `Unable to build http server with error: \n${error}`)
    return false
  }
}

export default buildHttp
