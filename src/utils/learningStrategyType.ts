export interface LearningStrategy {
  title: string;
  content: string;
  createDate: string;
  category: string;
  pic: string;
  userid: number;
}

export interface isCollectLearning {
  learningstrategyid: number;
  userid: number;
}

export interface CollectLearning {
  learningstrategyid: number
  userid: number
  createDate: Date
}

export interface DisCollectLearning {
  learningstrategyid: number
  userid: number
}

export interface LearningComment {
  userid: number
  learningid: number
  content: string
}

export interface ListCommentPage {
  learningid: number
  limit: number
  offset: number
}

export interface isLikeLearning {
  learningstrategyid: number;
  userid: number;
}

export interface LikeLearning {
  learningstrategyid: number
  userid: number
  createDate: Date
}

export interface DisLikeLearning {
  learningstrategyid: number
  userid: number
}

export interface LearningCollection {
  id: number
  userid: number
  learningstrategyid: number
  createDate: string
}
