import Router from 'koa-router'
import * as TutsauController from '../controller/tutsauController'

const router = new Router()
router.prefix('/api/tutsau')

router.get('/list', TutsauController.tutsauList)
router.get('/listByUser', TutsauController.tutsauByUser)
router.post('/upload', TutsauController.uploadPic)
router.post('/insert', TutsauController.insertTutsau)

export default router
