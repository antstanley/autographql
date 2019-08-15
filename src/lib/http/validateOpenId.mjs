import authenticate from '@esmodule/jwt-verify'
import { logger } from '../utils'

const validateOpenId = async (token, jwksOptions) => {
  try {
    const authResponse = await authenticate(token, jwksOptions)
    // logger('info', `authResponse: ${JSON.stringify(authResponse, null, 2)}`)
    if (!authResponse.error && !authResponse.errors) {
      return {
        valid: true,
        token,
        decoded: authResponse
      }
    } else {
      logger('warn', 'dev: Authentication fails')
      return {
        valid: false,
        token
      }
    }
  } catch (error) {
    logger('error', `dev: validateOpenId fails with error ${error}`)
    return {
      valid: false,
      token: null,
      decoded: null
    }
  }
}
export default validateOpenId
