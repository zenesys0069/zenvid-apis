import { isRequestValidated } from '../utils/validator.js'
import * as User from './user.validators.js'
import * as Explore from './explore.validators.js'

// merge all validators
const validators = {
  // user router endpoints validators
  user: User,
  explore: Explore,
  // attach isRequestValidated with validators to check if all request is successfully validated
  isRequestValidated: isRequestValidated,
}

export default validators
