import Router from 'koa-router';
import * as IndexController from '../controller/index'
const router = new Router();


router.prefix('/api/index');
router.get('/swiper', IndexController.indexSwiper);
router.get('/slider', IndexController.indexSlider);
// router.post('/', index);


export default router;
