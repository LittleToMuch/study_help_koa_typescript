export interface Experience {
  title: string;
  content: string;
  createDate: string;
  category: string;
  pic: string;
  userid: number;
}

export interface Select {
  id?: number
  pageSize?: number
  currentPage?: number
}

export interface isCollectExperience {
  experienceid: number;
  userid: number;
}

export interface CollectExperience {
  experienceid: number
  userid: number
  createDate: Date
}

export interface DisCollectExperience {
  experienceid: number
  userid: number
}

export interface ExperienceComment {
  userid: number
  experienceid: number
  content: string
}

export interface ListCommentPage {
  experienceid: number
  limit: number
  offset: number
}

export interface isLikeExperience {
  experienceid: number
  userid: number
}

export interface LikeExperience {
  experienceid: number
  userid: number
  createDate: Date
}

export interface DisLikeExperience {
  experienceid: number
  userid: number
}

export interface ExperienceCollection {
  id: number
  userid: number
  experienceid: number
  createDate: string
}