import Router, {RouterContext} from "koa-router";
import * as UserService from "../service/usersService";
import * as svgCaptcha from "svg-captcha";
import { Level } from '../utils/userType'

export const token = async (ctx: Router.RouterContext, next: any) => {
  try {
    let data = await UserService.token(ctx.state.user)
    if (data) {
      ctx.body = { code: 200, data: ctx.state.user.userInfo, msg: '身份有效', isAuth: true }
    } else {
      ctx.body = { code: 1234, msg: '请重新登陆', isAuth: false}
    }
  } catch (e) {
    ctx.body = { code: 1234, msg: '未登录', isAuth: false }
  }
};

export const register = async (ctx: RouterContext<any, any>, next: any) => {
  const { username, password, telephone, captcha, createDate } = ctx.request.body
  if (captcha.toLocaleLowerCase() === ctx.session.captcha) {
    ctx.session.captcha = null
    let data = await UserService.register({username, password, telephone, createDate, role: Level.COMMON});
    ctx.body = data
  } else {
    ctx.session.captcha = null
    ctx.body = { code: 405 } 
  }
};

export const login = async (ctx: RouterContext<any, any>, next: any) => {
  const { username, password, captcha } = ctx.request.body
  // console.log(ctx.request.body);
  console.log(ctx.session);
  
  if (captcha.toLocaleLowerCase() === ctx.session.captcha) {
    ctx.session.captcha = null
    let data = await UserService.login({ username, password })
    ctx.header
    ctx.body = data
  } else {
    ctx.session.captcha = null
    ctx.body = {code: 400}
  }
};

export const captcha = async (ctx: RouterContext<any, any>, next: any) => {
  let captcha = svgCaptcha.create({
    ignoreChars: "0o1i",
    noise: 2,
    fontSize: 45,
    background: "#ffffff",
    width: 100,
    height: 40
  });
  ctx.body = captcha.data
  ctx.session.captcha = captcha.text.toLocaleLowerCase()
};
