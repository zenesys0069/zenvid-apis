import { isRequestValidated } from '../utils/validator.mjs'
import * as User from './user.validators.mjs'
import * as Explore from './explore.validators.mjs'
import * as Follow from './follow.validators.mjs'

// merge all validators
const validators = {
  // user router endpoints validators
  user: User,
  explore: Explore,
  follow: Follow,
  // attach isRequestValidated with validators to check if all request is successfully validated
  isRequestValidated: isRequestValidated,
}

export default validators
