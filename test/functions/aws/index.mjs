import { handler } from '../../../.faasql/build/functions/aws/graphql'
import handlerFunc from '../../../.faasql/dist/functions/aws/graphql'

const event = {
  body: {
    query: 'query getHuman($id: ID!) { human(id: $id) { id name } }',
    variables: {
      id: 1
    }
  }
}

const event2 = {
  body: {
    query: 'query allHumans { allHumans { id name } }',
    variables: {
      id: 1
    }
  }
}

const returnBuildResponse = async event => {
  const response = await handler(event)
  console.log(`Unbundled: ${JSON.stringify(response, null, 2)}`)
  return response
}

const printBuildResponse = returnBuildResponse(event)

console.log(printBuildResponse)

const returnDistResponse = async event => {
  const response = await handlerFunc.handler(event2)
  console.log(`Bundled: ${JSON.stringify(response, null, 2)}`)
  return response
}

const printDistResponse = returnDistResponse(event)

console.log(printDistResponse)
