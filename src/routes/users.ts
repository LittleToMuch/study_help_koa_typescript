import Router from 'koa-router';
import * as UsersController from '../controller/usersController'
import session from 'koa-session';
const router = new Router();
router.prefix('/api/users');

router.get('/', UsersController.index);
router.get('/captcha', UsersController.captcha);
router.post('/register', UsersController.register);
router.post('/login', UsersController.login);

export default router;
