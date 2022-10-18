import exploreRouter from '../api/v1/routes/explore.routes.mjs'
import infoRouter from '../api/v1/routes/info.routes.mjs'
import userRouter from '../api/v1/routes/user.routes.mjs'
import watchRouter from '../api/v1/routes/watch.router.mjs'

const routes = {
  user: userRouter,
  watch: watchRouter,
  explore: exploreRouter,
  info: infoRouter,
}

export default routes
