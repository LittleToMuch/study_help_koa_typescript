import Router from 'koa-router';
import * as VideoController from '../controller/videoController'

const router = new Router();
router.prefix('/api/video');

router.get('/list', VideoController.videoList)
router.post('/insert', VideoController.videoInsert)
router.post('/update', VideoController.videoUpdate)
router.post('/del', VideoController.videoDel)

export default router