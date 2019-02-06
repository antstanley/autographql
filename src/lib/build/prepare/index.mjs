import createFunction from './functions'
import createStructure from './createStructure'

const prepare = async ({
  root,
  schema,
  resolvers,
  name,
  providers,
  external
}) => {
  try {
    let functions = []
    if (createStructure(root)) {
      providers.forEach(provider => {
        functions.push(
          createFunction({
            root,
            schema,
            resolvers,
            functionName: name,
            provider,
            external
          })
        )
      })
    }

    return functions
  } catch (error) {
    throw new Error(error)
  }
}

export default prepare
