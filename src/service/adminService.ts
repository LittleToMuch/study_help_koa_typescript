import { query } from "../utils/query";
import {Admin, UserInfo, Select} from "../utils/adminType";
import { sign } from 'jsonwebtoken'
import JWT from 'koa-jwt'

const secret: string = 'hyh'
const jwt: JWT.Middleware = JWT({ secret })

export const login = async (params: Admin) => {
  const { username, password } = params
  const selectSQL: string = `select * from admin where admin_name='${username}' && password='${password}'`
  const res = await query(selectSQL)
  if(res.length) {
    const token = sign({userInfo: res[0], exp: Date.now() + 1000 * 3600}, secret)
    return { code: 200, token, msg: '登录成功' }
  } else {
    return { code: 404, msg: '未找到用户' }
  }
}

export const teacherUpdate = async (params: UserInfo) => {
  try {
    const { id, admin_name, name, password, avatar } = params
    const updateSQL: string = `update admin set admin_name='${admin_name}', name='${name}', password='${password}', avatar='${avatar}' where id=${id}`
    const res = await query(updateSQL)
    if (res.affectedRows) {
      return { code: 200, msg: '更新成功' }
    } else {
      return { code: 401, msg: '更新失败' }
    }
  } catch (error) {
    console.warn(error)
    return { code: 400, msg: '未知错误,查看服务器日志' }
  }
}

export const teacherInsert = async (params: UserInfo) => {
  try {
    const { admin_name, name, password, avatar } = params
    const insertSQL: string = `insert into admin (admin_name, name, password, avatar, level) values ('${admin_name}', '${name}', '${password}', '${avatar}', 2)`
    const res = await query(insertSQL)
    if (res.insertId) {
      return { code: 200, msg: '创建成功' }
    } else {
      return { code: 401, msg: '创建失败' }
    }
  } catch (error) {
    console.warn(error)
    return { code: 400, msg: '未知错误,查看服务器日志' }
  }
}

export const teacherList = async (params: Select) => {
  try {
    const {id, pageSize, currentPage} = params
    let selectSQL: string = ''
    if (id) {
      selectSQL = `select * from admin where id=${id} && level=2`
    } else {
      if (pageSize && currentPage) {
        selectSQL = `select * from admin where level=2 limit ${pageSize} offset ${(currentPage - 1) * pageSize}`
      } else {
        selectSQL = `select * from admin where level=2`
      }
    }
    const totalSQL = `select count(id) from admin where level=2`
    const data = await query(selectSQL)
    const total = await query(totalSQL)
    if(data.length) return { code: 200, data, total: total[0]['count(id)'], msg: '查询成功' }
    else return { code: 401, msg: "查询失败" }
  } catch (error) {
    console.warn(error)
    return { code: 400, msg: '未知错误,查看服务器日志' }
  }
}
