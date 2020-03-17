import Router, { RouterContext } from "koa-router";
import * as LearningStrategyService from "../service/learningStrategyService";
import * as ExperienceService from "../service/experienceService";

// 添加攻略
export const insertLearning = async (ctx: RouterContext, next: any) => {
  try {
    const {
      userid,
      title,
      content,
      pic,
      createDate,
      category
    } = ctx.request.body;
    if (!userid || !title || !content || !pic || !createDate || !category) {
      ctx.body = { code: 402, msg: "参数不正确" };
    } else {
        const params = {
          userid,
          title,
          content,
          pic,
          createDate,
          category: "攻略"
        };
        const data = await LearningStrategyService.insertLearningStrategy(
          params
        );
        ctx.body = data;
    }
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

//查询
export const selectExperience = async (ctx: RouterContext, next: any) => {
  try {
    const { id } = ctx.request.query;
    const data = await LearningStrategyService.selectLearning(id);
    ctx.body = data;
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

// 删除
export const deleteExperience = async (ctx: RouterContext, next: any) => {
  try {
    const { id } = ctx.request.query
    const data = await LearningStrategyService.deleteLearning(id)
    ctx.body = data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 查看是否收藏
export const isCollection = async (ctx: RouterContext, next: any) => {
  try {
    const { learningstrategyid, userid } = ctx.request.body
    if (!learningstrategyid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const data = await LearningStrategyService.isCollection({ learningstrategyid, userid })
    return data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 收藏
export const collectLearning = async (ctx: RouterContext, next: any) => {
  try {
    const { learningstrategyid, userid } = ctx.request.body
    if (!learningstrategyid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const createDate = new Date()
    const data = await LearningStrategyService.collectLearning({ learningstrategyid, userid, createDate })
    return data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 取消收藏
export const disCollectLearning = async (ctx: RouterContext, next: any) => {
  try {
    const { learningstrategyid, userid } = ctx.request.body
    if (!learningstrategyid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const data = await LearningStrategyService.disCollectLearning({ learningstrategyid, userid })
    return data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 插入评论信息
export const insertComment = async (ctx: RouterContext, next: any) => {
  try {
    const { userid, commentid, content } = ctx.request.body
    if (!userid && !commentid && !content) {
      ctx.body = { code: 402, msg: '参数不正确' }
    } else {
      const data = await LearningStrategyService.insertComment({ userid, learningid: commentid, content })
      ctx.body = data
    }
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 评论列表
export const listComment = async (ctx: RouterContext, next: any) => {
  try {
    const { commentid, limit, offset } = ctx.request.query
    const data = await LearningStrategyService.listComment({ learningid: commentid, limit, offset })
    ctx.body = data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 查看是否点赞
export const isLike = async (ctx: RouterContext, next: any) => {
  try {
    const { learningstrategyid, userid } = ctx.request.body
    if (!learningstrategyid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const data = await LearningStrategyService.isLike({ learningstrategyid, userid })
    return data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 查看点赞列表
export const likeList = async (ctx: RouterContext, next: any) => {
  try {
    const { userid } = ctx.request.query
    if (!userid) ctx.body = { code: 401, msg: '参数错误' }
    const data = await LearningStrategyService.likeList(userid)
    ctx.body = data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 点赞
export const likeLearning = async (ctx: RouterContext, next: any) => {
  try {
    const { learningstrategyid, userid } = ctx.request.body
    if (!learningstrategyid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const createDate = new Date()
    const data = await LearningStrategyService.likeLearning({ learningstrategyid, userid, createDate })
    return data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 取消点赞
export const disLikeLearning = async (ctx: RouterContext, next: any) => {
  try {
    const { learningstrategyid, userid } = ctx.request.body
    if (!learningstrategyid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const data = await LearningStrategyService.disLikeLearning({ learningstrategyid, userid })
    return data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 我的收藏
export const myCollect = async (ctx: RouterContext, next: any) => {
  try {
    const { userid } = ctx.request.query
    if (!userid) ctx.body = { code: 401, msg: '参数错误' }
    const data = await LearningStrategyService.myCollect(userid)
    ctx.body = data
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}