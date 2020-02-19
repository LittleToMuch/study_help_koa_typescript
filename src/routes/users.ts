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
router.post('/uploadAvatar', UsersController.uploadAvatar);
router.post('/updateAvatar', UsersController.updateAvatar);
router.post('/vertifyOldpsw', UsersController.vertifyOldpsw);
router.post('/setPassword', UsersController.setPassword)
export default router;
