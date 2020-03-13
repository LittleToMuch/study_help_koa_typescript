import Router from 'koa-router'
import * as ExperienceController from '../controller/experienceController'
import * as UsersController from '../controller/usersController'
import JWT from 'koa-jwt'
const secret: string = 'hyh'
const jwt: JWT.Middleware = JWT({ secret })

const router = new Router()
router.prefix('/api/experience')

router.post('/insert', ExperienceController.insertExperience)
router.post('/isCollection', jwt, UsersController.token, ExperienceController.isCollection)
router.post('/collect', jwt, UsersController.token, ExperienceController.collectExperience)
router.post('/disCollect', jwt, UsersController.token, ExperienceController.disCollectExperience)
router.post('/isLike', jwt, UsersController.token, ExperienceController.isLike)
router.post('/like', jwt, UsersController.token, ExperienceController.likeExperience)
router.post('/disLike', jwt, UsersController.token, ExperienceController.disLikeExperience)
router.post('/insertComment', ExperienceController.insertComment)
router.get('/myCollection', ExperienceController.myCollect) //我的经验收藏
router.get('/list', ExperienceController.selectExperience) // 可查单条也可查多条
router.get('/listComment', ExperienceController.listComment)
router.delete('/del', ExperienceController.deleteExperience)

export default router;
