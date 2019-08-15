import createFunction from './functions'
import createStructure from './createStructure'

const prepare = async ({
  root,
  schema,
  resolvers,
  name,
  functions,
  openid,
  external
}) => {
  try {
    const functionManifest = []
    if (createStructure(root)) {
      functions.forEach(functionConfig => {
        functionManifest.push(
          createFunction({
            root,
            schema,
            resolvers,
            functionName: name,
            functionConfig,
            openid,
            external
          })
        )
      })
    }

    return functionManifest
  } catch (error) {
    throw new Error(error)
  }
}

export default prepare
