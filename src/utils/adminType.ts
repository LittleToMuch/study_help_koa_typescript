export interface Admin {
  username: string
  password: string
}

export interface UserInfo {
  id: number
  admin_name: string
  name: string
  password: string
  avatart: string
  level: number
}

export interface Token {
  userInfo: UserInfo
  exp: number
  iat: number
}