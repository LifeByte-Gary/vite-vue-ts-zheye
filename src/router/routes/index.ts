import appRoutes from '@/router/routes/appRoutes'
import authRoutes from '@/router/routes/authRoutes'
import columnRoutes from '@/router/routes/columnRoutes'
import postRoutes from '@/router/routes/postRoutes'

const routes = [...appRoutes, ...authRoutes, ...columnRoutes, ...postRoutes]

export default routes
