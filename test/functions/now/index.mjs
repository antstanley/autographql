import handler from '../../../.faasql/build/functions/now/graphql'
import handlerFunc from '../../../.faasql/dist/functions/now/graphql'

const req = {
  body: {
    query: 'query getHuman($id: ID!) { human(id: $id) { id name } }',
    variables: {
      id: 1
    }
  }
}

const req1 = {
  body: {
    query: 'query allHumans { allHumans { id name } }',
    variables: {
      id: 1
    }
  }
}

const res = {
  end (resp) {
    return console.log(resp)
  }
}

const returnBuildResponse = async (req, res) => {
  const response = await handler(req, res)
  // console.log(`Unbundled: ${JSON.stringify(response, null, 2)}`)
  return response
}

returnBuildResponse(req, res)

const returnDistResponse = async (req, res) => {
  const response = await handlerFunc(req, res)
  // console.log(`Bundled: ${JSON.stringify(response, null, 2)}`)
  return response
}

returnDistResponse(req1, res)
