
export interface Register {
  username: string;
  password: string;
  createDate: Date;
  telephone: string;
  role: Level.COMMON | Level.VIP;
}

export interface Login {
  username: string;
  password: string;
}

interface IUserInfo {
  id: number
  username: string
  role: number
  createDate: string
  telephone: string
}

export interface Token {
  userInfo: IUserInfo
  exp: number
  iat: number
}

export enum Level {
  COMMON,
  VIP
}

export interface Swiper {
  id: number
  path: string
}

export interface Slider {
  id: number
  path: string
}

