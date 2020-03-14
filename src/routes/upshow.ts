import Router from 'koa-router';
import * as UpshowController from '../controller/upshowController'

const router = new Router()
router.prefix('/api/upshow')

router.get('/ranking', UpshowController.ranking)
router.get('/findUser', UpshowController.findUser)





export default router