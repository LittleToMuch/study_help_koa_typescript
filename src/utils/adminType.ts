export interface Admin {
  username: string
  password: string
}

export interface UserInfo {
  id?: number
  admin_name: string
  name: string
  password: string
  avatar: string
}

export interface Token {
  userInfo: UserInfo
  exp: number
  iat: number
}

export interface Select {
  id?: number
  pageSize?: number
  currentPage?: number
}