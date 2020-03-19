import Router, { RouterContext } from "koa-router";
import * as ExperienceService from "../service/experienceService";
import {query} from "../utils/query";

// 添加经验
export const insertExperience = async (ctx: RouterContext, next: any) => {
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
          category
        };
        const data = await ExperienceService.insertExperience(params);
        ctx.body = data;
    }
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

// 查询
export const selectExperience = async (ctx: RouterContext, next: any) => {
  try {
    const data = await ExperienceService.selectExperience(ctx.request.query)
    ctx.body = data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 删除
export const deleteExperience = async (ctx: RouterContext, next: any) => {
  try {
    const { id } = ctx.request.query
    const data = await ExperienceService.deleteExperience(+id)
    ctx.body = data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 查看是否收藏
export const isCollection = async (ctx: RouterContext, next: any) => {
  try {
    const { experienceid, userid } = ctx.request.body
    if (!experienceid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const data = await ExperienceService.isCollection({ experienceid, userid })
    return data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 收藏
export const collectExperience = async (ctx: RouterContext, next: any) => {
  try {
    const { experienceid, userid } = ctx.request.body
    if (!experienceid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const createDate = new Date()
    const data = await ExperienceService.collectExperience({ experienceid, userid, createDate })
    return data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 取消收藏
export const disCollectExperience = async (ctx: RouterContext, next: any) => {
  try {
    const { experienceid, userid } = ctx.request.body
    if (!experienceid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const data = await ExperienceService.disCollectExperience({ experienceid, userid })
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
      const data = await ExperienceService.insertComment({ userid, experienceid: commentid, content })
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
    const data = await ExperienceService.listComment({ experienceid: commentid, limit, offset })
    ctx.body = data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 查看是否点赞
export const isLike = async (ctx: RouterContext, next: any) => {
  try {
    const { experienceid, userid } = ctx.request.body
    if (!experienceid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const data = await ExperienceService.isLike({ experienceid, userid })
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
    const data = await ExperienceService.likeList(userid)
    ctx.body = data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 点赞
export const likeExperience = async (ctx: RouterContext, next: any) => {
  try {
    const { experienceid, userid } = ctx.request.body
    if (!experienceid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const createDate = new Date()
    const data = await ExperienceService.likeExperience({ experienceid, userid, createDate })
    return data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 取消点赞
export const disLikeExperience = async (ctx: RouterContext, next: any) => {
  try {
    const { experienceid, userid } = ctx.request.body
    if (!experienceid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const data = await ExperienceService.dislikeExperience({ experienceid, userid })
    return data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 我的收藏id
export const myCollect = async (ctx: RouterContext, next: any) => {
  try {
    const { userid } = ctx.request.query
    if (!userid) ctx.body = { code: 401, msg: '参数错误' }
    const data = await ExperienceService.myCollect(userid)
    ctx.body = data
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}
