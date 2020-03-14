import Router, { RouterContext } from "koa-router";
import * as TutsauService from "../service/tutsauService";

// 上传图片
export const uploadPic = async (ctx: RouterContext, next: any) => {
  try {
    const { file } = ctx.request.files!;
    if (file) {
      const path = file.path
        .split("\\")
        .slice(-2)
        .join("/");
      ctx.body = { code: 200, data: path };
    } else {
      ctx.body = { code: 400, msg: "参数错误" };
    }
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

// 添加吐槽
export const insertTutsau = async (ctx: RouterContext, next: any) => {
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
      const data = await TutsauService.insertTutsau(ctx.request.body);
      ctx.body = data;
    }
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

// 吐槽列表
export const tutsauList = async (ctx: RouterContext, next: any) => {
  try {
    const data = await TutsauService.tutsauList()
    ctx.body = data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

// 根据userid查吐槽
export const tutsauByUser = async (ctx: RouterContext, next: any) => {
  try {
    const { userid } = ctx.request.query
    if (!userid) {
      ctx.body = { code: 402, msg: '参数不正确' }
    } else {
      const data = await TutsauService.tutsauByUser(+userid)
      ctx.body = data
    }
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 删除吐槽
export const delTutsau = async (ctx: RouterContext, next: any) => {
  try {
    const { id } = ctx.request.query
    if (!id) {
      ctx.body = { code: 402, msg: '参数不正确' }
    } else {
      const data = await TutsauService.delTutsau(+id)
      ctx.body = data
    }
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 根据id查吐槽
export const findTutsau = async (ctx: RouterContext, next: any) => {
  try {
    const { id } = ctx.request.query
    if (!id) {
      ctx.body = { code: 402, msg: '该吐槽已删除' }
    } else {
      const data = await TutsauService.findTutsau(+id)
      ctx.body = data
    }
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 插入评论信息
export const insertComment = async (ctx: RouterContext, next: any) => {
  try {
    const { userid, tutsauid, content } = ctx.request.body
    if (!userid && !tutsauid && !content) {
      ctx.body = { code: 402, msg: '参数不正确' }
    } else {
      const data = await TutsauService.insertComment({ userid, tutsauid, content })
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
    const { tutsauid, limit, offset } = ctx.request.query
    const data = await TutsauService.listComment({ tutsauid, limit, offset })
    ctx.body = data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 收藏
export const collectTutsau = async (ctx: RouterContext, next: any) => {
  try {
    const { tutsauid, userid } = ctx.request.body
    if (!tutsauid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const createDate = new Date()
    const data = await TutsauService.collectTutsau({ tutsauid, userid, createDate })
    return data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 取消收藏
export const disCollectTutsau = async (ctx: RouterContext, next: any) => {
  try {
    const { tutsauid, userid } = ctx.request.body
    if (!tutsauid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const data = await TutsauService.disCollectTutsau({ tutsauid, userid })
    return data
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 查看是否收藏
export const isCollection = async (ctx: RouterContext, next: any) => {
  try {
    const { tutsauid, userid } = ctx.request.body
    if (!tutsauid || !userid) ctx.body = { code: 401, msg: '参数错误' }
    const data = await TutsauService.isCollection({ tutsauid, userid })
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
    console.log(userid)
    if (!userid) ctx.body = { code: 401, msg: '参数错误' }
    const data = await TutsauService.myCollect(userid)
    ctx.body = data
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}