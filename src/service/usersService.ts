import { query } from "../utils/query";
import { Login, Register, Token } from "../utils/userType";
import crypto from 'crypto'
import { sign } from 'jsonwebtoken'
import JWT from 'koa-jwt'

const secret: string = 'hyh'
const jwt: JWT.Middleware = JWT({ secret })

export const token = async (params: Token) => {
  if( Date.now() > params.exp ) return false
  return true
}

export const login = async (params: Login) => {
  const { username, password } = params
  const shadow = crypto.createHash('md5').update(password + 'hyh').digest('hex')
  const sql: string = `select * from user where user.username='${username}' && user.password='${shadow}'`;
  let res = await query(sql);
  if (res.length) {
    const { id, username, role, createDate, telephone } = res[0]
    const userInfo = { id, username, role, createDate, telephone }
    const token = sign({ userInfo, exp: Date.now() + 1000 * 10 }, secret)
    return { code: 200, token, userInfo }
  } else {
    return { code: 401 }
  }
};

export const register = async (params: Register) => {
  try {
    const { username, password, createDate, telephone, role } = params;
    const hasUserByUsernameSQL: string = `select * from user where user.username='${username}'`
    const hasUserByTelephoneSQL: string = `select * from user where user.telephone='${telephone}'`
    const hasUserByUser = await query(hasUserByUsernameSQL)
    const hasUserByTelephone = await query(hasUserByTelephoneSQL)
    if (!hasUserByUser.length && !hasUserByTelephone.length) {
      const shadow = crypto.createHash('md5').update(password + 'hyh').digest('hex')
      const insertSQL: string = `insert into user (username, password, createDate, telephone, role) values ('${username}', '${shadow}', '${createDate}', '${telephone}', '${role}')`;
      const res = await query(insertSQL);
      if (res.insertId) return { code: 200 }
    } else if (hasUserByTelephone.length) {
      return { code: 401 }
    } else if (hasUserByUser.length) {
      return { code: 402 }
    }
  } catch (err) {
    return { code: 400 }
  }
};
