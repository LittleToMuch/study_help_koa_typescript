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

export const teacherUpdate = async (ctx: RouterContext, next: any) => {
  try {
    const { id, admin_name, name, password, avatar } = ctx.request.body
    const data = await AdminService.teacherUpdate({ id, admin_name, name, password, avatar })
    ctx.body = data
  } catch (e) {
    console.warn(e)
    ctx.body = { code: 400, msg: '未知错误,查看服务器日志' }
  }
}

export const teacherInsert = async (ctx: RouterContext, next: any) => {
  try {
    const { admin_name, name, password, avatar } = ctx.request.body
    const data = await AdminService.teacherInsert({ admin_name, name, password, avatar })
    ctx.body = data
  } catch (error) {
    console.warn(error)
    ctx.body = { code: 400, msg: '未知错误,查看服务器日志' }
  }
};

export const teacherList = async (ctx: RouterContext, next: any) => {
  try {
    const data = await AdminService.teacherList(ctx.request.query)
    ctx.body = data
  } catch (error) {
    console.warn(error)
    ctx.body = { code: 400, msg: '未知错误,查看服务器日志' }
  }
};

export const delTeacher = async (ctx: RouterContext, next: any) => {
  try {
    const { id } = ctx.request.body
    const data = await AdminService.delTeacher(id)
    ctx.body = data
  } catch (error) {
    console.warn(error)
    ctx.body = { code: 400, msg: '未知错误,查看服务器日志' }
  }
};
