import Router, {RouterContext} from "koa-router";
import * as UserService from "../service/usersService";
import * as svgCaptcha from "svg-captcha";
import { Level } from '../utils/userType'


export const token = async (ctx: Router.RouterContext, next: any) => {
  try {
    // console.log(ctx.state.user)
    let data = await UserService.token(ctx.state.user)
    if (data) {
      const data = await next()
      ctx.body = data
    } else {
      ctx.body = { code: 1234, msg: '请重新登陆', isAuth: false}
    }
  } catch (e) {
    ctx.body = { code: 1234, msg: '未登录', isAuth: false }
  }
};

export const tokenValidate = async (ctx: Router.RouterContext, next: any) => {
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

export const vertifyOldpsw = async (ctx: RouterContext, next: any) => {
  try {
    const { password } = ctx.request.body
    const res = await UserService.vertifyOldpsw(password as string)
    ctx.body = res
  } catch (e) {
    console.warn(e)
    ctx.body = { code: 400, msg: '未知错误,查看服务器日志' }
  }
}

export const setPassword = async (ctx: RouterContext, next: any) => {
  try {
    const { id, password } = ctx.request.body
    const params = { id, password }
    const res = await UserService.setPassword(params)
    ctx.body = res
  } catch (e) {
    console.warn(e)
    ctx.body = { code: 400, msg: '未知错误,查看服务器日志' }
  }
}

export const uploadAvatar = async (ctx: RouterContext, next: any) => {
  try {
    const { avatar } = ctx.request.files!
    const path = avatar.path.split('\\').slice(-2).join("/")
    if (avatar) {
      ctx.body = { code: 200, data: path }
    } else {
      ctx.body = { code: 400, msg: '参数错误' }
    }
  } catch (e) {
    console.warn(e)
    ctx.body = { code: 400, msg: '未知错误,查看服务器日志' }
  }
}

export const updateAvatar = async (ctx: RouterContext, next: any) => {
  try {
    const { path, id } = ctx.request.body
    const param = { path, id }
    const data = await UserService.updateAvatar(param)
    ctx.body = data
  } catch (e) {
    console.warn(e)
    ctx.body = { code: 400, msg: '未知错误,查看服务器日志' }
  }
}

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


export const userList = async (ctx: RouterContext, next: any) => {
  try {
    const data = await UserService.userList()
    ctx.body = data
  } catch (error) {
    console.warn(error)
    ctx.body = { code: 400, msg: '未知错误,查看服务器日志' }
  }
};

export const delUser = async (ctx: RouterContext, next: any) => {
  try {
    const { id } = ctx.request.body
    if (id) {
      const data = await UserService.delUser(id)
      ctx.body = data
    } else {
      ctx.body = { code: 401, msg: '参数错误' }
    }
  } catch (error) {
    console.warn(error)
    ctx.body = { code: 400, msg: '未知错误,查看服务器日志' }
  }
};