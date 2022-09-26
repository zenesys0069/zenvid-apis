import otpSchema from './otp.schema.js'
import userSchema from './user.schema.js'

// merges all schemas and exported as default
const schemas = {
  user: userSchema,
  otp: otpSchema,
}

export default schemas
