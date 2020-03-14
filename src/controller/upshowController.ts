import Router, { RouterContext } from "koa-router";
import * as UpshowService from "../service/upshowService";

export const ranking = async (ctx: RouterContext, next: any) => {
  try {
    const data = await UpshowService.ranking();
    ctx.body = data;
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

export const findUser = async (ctx: RouterContext, next: any) => {
  try {
    const { id } = ctx.request.query;
    const data = await UpshowService.findUser(id);
    ctx.body = data;
  } catch (error) {
    console.warn(error);
    ctx.body = { code: 400, msg: "未知错误,查看服务器日志" };
  }
};
