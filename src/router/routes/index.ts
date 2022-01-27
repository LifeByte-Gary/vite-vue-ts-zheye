import appRoute from '@/router/routes/app.route'
import authRoute from '@/router/routes/auth.route'
import columnRoute from '@/router/routes/column.route'
import postRoute from '@/router/routes/post.route'

const routes = [...appRoute, ...authRoute, ...columnRoute, ...postRoute]

export default routes
