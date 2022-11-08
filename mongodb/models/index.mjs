// merges all models and exported as default

import User from './user.model.mjs'
import Otp from './otp.model.mjs'
import { Watch, Comment } from './watch.model.mjs'

const models = {
  User,
  Otp,
  Watch,
  Comment,
}

export default models
