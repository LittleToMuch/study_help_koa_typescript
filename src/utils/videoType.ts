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