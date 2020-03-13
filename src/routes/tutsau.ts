import Router from 'koa-router'
import * as TutsauController from '../controller/tutsauController'
import * as UsersController from '../controller/usersController'
import JWT from 'koa-jwt'
const secret: string = 'hyh'
const jwt: JWT.Middleware = JWT({ secret })

const router = new Router()
router.prefix('/api/tutsau')

router.get('/list', TutsauController.tutsauList)
router.get('/listByUser', TutsauController.tutsauByUser)
router.get('/details', TutsauController.findTutsau)
router.get('/listComment', TutsauController.listComment)
router.post('/upload', TutsauController.uploadPic)
router.post('/insert', TutsauController.insertTutsau)
router.post('/insertComment', TutsauController.insertComment)
router.post('/collectTutsau', jwt, UsersController.token, TutsauController.collectTutsau)
router.post('/disCollectTutsau', jwt, UsersController.token, TutsauController.disCollectTutsau)
router.post('/isCollection', jwt, UsersController.token, TutsauController.isCollection)
router.delete('/del', TutsauController.delTutsau)

export default router
