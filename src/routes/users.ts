import Router from 'koa-router';
import * as UsersController from '../controller/usersController'
import JWT from 'koa-jwt'
const secret: string = 'hyh'
const jwt: JWT.Middleware = JWT({ secret })
const router = new Router();
router.prefix('/api/users');

router.get('/token', jwt, UsersController.token);
router.get('/captcha', UsersController.captcha);
router.post('/register', UsersController.register);
router.post('/login', UsersController.login);

export default router;
