import authenticate from '@esmodule/jwt-verify'

const validateOpenId = async (token, jwksOptions) => {
  try {
    const authResponse = await authenticate(token, jwksOptions)
    if (!authResponse.error && !authResponse.errors) {
      return {
        valid: true,
        token,
        decoded: authResponse
      }
    } else {
      return {
        valid: false,
        token
      }
    }
  } catch (error) {
    return {
      valid: false,
      token: null,
      decoded: null
    }
  }
}
export default validateOpenId
