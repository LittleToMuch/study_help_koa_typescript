export interface Tutsau {
  id?: number;
  userid: number;
  title: string;
  content: string;
  category: string;
  pic: string;
  createDate: string;
}

export interface TutsauComment {
  userid: number
  tutsauid: number
  content: string
}

export interface ListCommentPage {
  tutsauid: number
  limit: number
  offset: number
}

export interface CollectTutsau {
  tutsauid: number
  userid: number
  createDate: Date
}

export interface DisCollectTutsau {
  tutsauid: number
  userid: number
}

export interface isCollectTutsau {
  tutsauid: number
  userid: number
}

export interface TutsauCollection {
  id: number
  userid: number
  tutsauid: number
  createDate: string
}

export type Category = string;

export type UserId = number;
