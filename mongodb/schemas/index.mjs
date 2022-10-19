import otpSchema from './otp.schema.mjs'
import userSchema from './user.schema.mjs'
import watchSchema from './watch.schema.mjs'

// merges all schemas and exported as default
const schemas = {
  user: userSchema,
  otp: otpSchema,
  watch: watchSchema,
}

export default schemas
