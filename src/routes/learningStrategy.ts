import Router from 'koa-router'
import * as LearningController from '../controller/learningStrategyController'
import * as UsersController from '../controller/usersController'
import JWT from 'koa-jwt'
const secret: string = 'hyh'
const jwt: JWT.Middleware = JWT({ secret })

const router = new Router()
router.prefix('/api/learning')

router.post('/insert', LearningController.insertLearning)
router.post('/isCollection', jwt, UsersController.token, LearningController.isCollection)
router.post('/collect', jwt, UsersController.token, LearningController.collectLearning)
router.post('/disCollect', jwt, UsersController.token, LearningController.disCollectLearning)
router.post('/isLike', jwt, UsersController.token, LearningController.isLike)
router.post('/like', jwt, UsersController.token, LearningController.likeLearning)
router.post('/disLike', jwt, UsersController.token, LearningController.disLikeLearning)
router.post('/insertComment', LearningController.insertComment)
router.get('/myCollection', LearningController.myCollect) //我的经验收藏
router.get('/list', LearningController.selectExperience) //可查单条也可查多条
router.get('/listComment', LearningController.listComment)
router.get('/likeList', LearningController.likeList) //点赞列表
router.delete('/del', LearningController.deleteExperience)

export default router;
