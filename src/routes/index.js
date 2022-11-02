import { HeaderOnlyLayout } from '~/components/Layout'

import Home from '~/pages/Home/Home'
import Following from '~/pages/Following/Following'
import Profile from '~/pages/Profile/Profile'
import Upload from '~/pages/Upload/Upload'
import Search from '~/pages/Search/Search'
import routesConfig from '~/config/routes'

const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.following, component: Following },
    { path: routesConfig.profile, component: Profile },
    { path: routesConfig.upload, component: Upload, layout: HeaderOnlyLayout },
    { path: routesConfig.search, component: Search, layout: null },
]
const privateRoutes = []

export { publicRoutes, privateRoutes }
