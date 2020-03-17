import { query } from "../utils/query";
import {Admin} from "../utils/adminType";
import { sign } from 'jsonwebtoken'
import JWT from 'koa-jwt'
import { Token } from "../utils/adminType";

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
