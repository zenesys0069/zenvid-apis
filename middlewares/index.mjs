import * as User from './user.middleware.mjs'
import * as Watch from './watch.middleware.mjs'
import * as Common from './common.middleware.mjs'

const middleware = {
  user: User,
  watch: Watch,
  common: Common,
}
export default middleware
