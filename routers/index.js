import exploreRouter from '../api/v1/routes/explore.routes.js'
import userRouter from '../api/v1/routes/user.routes.js'
import watchRouter from '../api/v1/routes/watch.router.js'

const routes = { user: userRouter, watch: watchRouter, explore: exploreRouter }

export default routes
