export interface Video {
  id?: number
  category: string
  video_name: string
  video_pic: string
  video_path: string
  video_intro: string
  video_price: number
  adminId?: number
}

export interface Select {
  id?: number
  pageSize?: number
  currentPage?: number
}

export type VideoCategory = '数据结构' | '计算机网络' | '软件工程' | '操作系统' | '数据库原理' | '单片机' | '计算机组成原理' | '编译原理'