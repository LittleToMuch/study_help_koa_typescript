import Router, { RouterContext } from "koa-router";
import * as TutsauService from "../service/tutsauService";

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
