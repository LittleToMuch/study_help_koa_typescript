import Router, { RouterContext } from "koa-router";
import * as VideoService from "../service/videoService";

export const videoInsert = async (ctx: RouterContext, next: any) => {
  try {
    const {
      category,
      video_name,
      video_pic,
      video_path,
      video_intro,
      video_price,
      adminId
    } = ctx.request.body;
    if (
      category &&
      video_name &&
      video_pic &&
      video_path &&
      video_intro &&
      video_price !== "undifined" &&
      adminId
    ) {
      const res = await VideoService.videoInsert({
        category,
        video_name,
        video_pic,
        video_path,
        video_intro,
        video_price,
        adminId
      });
      ctx.body = res;
    } else {
      ctx.body = { code: 401, msg: "参数不正确" };
    }
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

export const videoList = async (ctx: RouterContext, next: any) => {
  try {
    const data = await VideoService.videoList(ctx.request.query);
    ctx.body = data;
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

export const videoUpdate = async (ctx: RouterContext, next: any) => {
  try {
    const {
      id,
      category,
      video_name,
      video_pic,
      video_path,
      video_intro,
      video_price
    } = ctx.request.body;
    const data = await VideoService.videoUpdate({
      id,
      category,
      video_name,
      video_pic,
      video_path,
      video_intro,
      video_price
    });
    ctx.body = data;
  } catch (e) {
    console.warn(e);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

export const videoDel = async (ctx: RouterContext, next: any) => {
  try {
    const { id } = ctx.request.body;
    const data = await VideoService.videoDel(id);
    ctx.body = data;
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
};
