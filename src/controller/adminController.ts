import {RouterContext} from "koa-router";
import * as AdminService from "../service/adminService";

export const login = async (ctx: RouterContext, next: any) => {
  const { username, password } = ctx.request.body
    if (username && password) {
      let data = await AdminService.login({ username, password })
      ctx.body = data
    } else {
      ctx.body = { code: 402, msg: '参数错误' }
    }
};

