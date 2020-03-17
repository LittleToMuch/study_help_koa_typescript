import Router from 'koa-router';
import * as AdminController from '../controller/adminController'
import JWT from 'koa-jwt'

const secret: string = 'hyh'
const jwt: JWT.Middleware = JWT({ secret })

const router = new Router();
router.prefix('/api/admin');

router.post('/login', AdminController.login)

export default router