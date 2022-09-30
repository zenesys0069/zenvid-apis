import otpSchema from './otp.schema.mjs'
import userSchema from './user.schema.mjs'

// merges all schemas and exported as default
const schemas = {
  user: userSchema,
  otp: otpSchema,
}

export default schemas
