import Router, {RouterContext} from "koa-router";
import * as UserService from "../service/usersService";
import * as svgCaptcha from "svg-captcha";
import { Level } from '../service/userType'

export const index = async (ctx: Router.RouterContext, next: any) => {
  ctx.body = "Hello!dsddss";
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
  if (captcha.toLocaleLowerCase() === ctx.session.captcha) {
    ctx.session.captcha = null
    let data = await UserService.login({ username, password })
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
