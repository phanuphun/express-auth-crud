import Express from 'express'
import {loginRoute} from './loginRoute'
import {categoryRoute} from './categoryRoute'
import {validateToken} from '../middleware/authz'

const router = Express.Router()

router.use(loginRoute)
router.use(validateToken,categoryRoute)

export default router
