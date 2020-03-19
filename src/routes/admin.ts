import Router from 'koa-router';
import * as AdminController from '../controller/adminController'
import JWT from 'koa-jwt'

const secret: string = 'hyh'
const jwt: JWT.Middleware = JWT({ secret })

const router = new Router();
router.prefix('/api/admin');

router.post('/login', AdminController.login)
router.post('/insert', AdminController.teacherInsert)
router.post('/uploadAvatar', AdminController.uploadAvatar);
router.post('/update', AdminController.teacherUpdate)
router.get('/list', AdminController.teacherList)
router.post('/del', AdminController.delTeacher)

export default router