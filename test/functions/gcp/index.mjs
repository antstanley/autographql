import handler from '../../../.faasql/build/functions/gcp/graphql'
import handlerFunc from '../../../.faasql/dist/functions/gcp/graphql'

const get = header => {
  return header === 'Authorization' ? 'Bearer 123456' : null
}

const status = async code => {
  console.log(`statusCode: ${code}`)
  this.json = await json()
}

const json = async response => {
  console.log(`json: ${response}`)
}

const req = {
  body: {
    query: 'query getHuman($id: ID!) { human(id: $id) { id name } }',
    variables: {
      id: 1
    }
  },
  get
}

const req1 = {
  body: {
    query: 'query allHumans { allHumans { id name } }',
    variables: {
      id: 1
    }
  },
  get
}

const res = {
  send (resp) {
    return console.log(resp)
  },
  status
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
