import { isRequestValidated } from '../utils/validator.js'
import * as user from './user.validators.js'

// merge all validators
const validators = {
  // user router endpoints validators
  user: user,
  // attach isRequestValidated with validators to check if all request is successfully validated
  isRequestValidated: isRequestValidated,
}

export default validators
