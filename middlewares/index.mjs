import * as User from './user.middleware.mjs'
import * as Watch from './watch.middleware.mjs'

const middleware = {
  user: User,
  watch: Watch,
}
export default middleware
