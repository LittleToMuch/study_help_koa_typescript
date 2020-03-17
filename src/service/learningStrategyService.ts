import { query } from "../utils/query";
import {
  LearningStrategy,
  isCollectLearning,
  CollectLearning,
  DisCollectLearning,
  LearningComment,
  ListCommentPage,
  LikeLearning, DisLikeLearning, isLikeLearning, LearningCollection
} from "../utils/learningStrategyType";

export const insertLearningStrategy = async (params: LearningStrategy) => {
  try {
    const { title, content, createDate, category, pic, userid } = params;
    const inserSQL: string = `insert into learningstrategy (title, content, createDate, category, pic, userid) values ('${title}', '${content}', '${createDate}', '${category}', '${pic}', '${userid}')`;
    const res = await query(inserSQL);
    if (res.insertId) return { code: 200 };
    else return { code: 401, msg: "添加数据失败" };
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

export const selectLearning = async (id: number | undefined) => {
  try {
    const selectSQL = id ? `select * from learningstrategy where id=${id} && del=0` : `select * from learningstrategy where del=0`
    const data = await query(selectSQL)
    if(data.length) return { code: 200, data, msg: '查询成功' }
    else return { code: 401, msg: "查询失败" }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

export const deleteLearning = async (id: number) => {
  try {
    const deleteSQL = `update learningstrategy set del=1 where id=${id}`
    const data = await query(deleteSQL)
    if(data.affectedRows) return { code: 200 }
    else return { code: 401, msg: '删除失败' }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 查看是否收藏
export const isCollection = async (params: isCollectLearning) => {
  try {
    const {learningstrategyid, userid} = params
    const selectSQL: string = `select * from learning_collection where userid=${userid} && learningstrategyid=${learningstrategyid}`
    const data = await query(selectSQL)
    if(data.length) {
      return { code: 200, msg: '查询成功' }
    } else {
      return { code: 401, msg: '查询失败' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 收藏
export const collectLearning = async (params: CollectLearning) => {
  try {
    const {learningstrategyid, userid, createDate} = params
    const insertSQL: string = `insert into learning_collection (userid, learningstrategyid, createDate) values (${userid}, ${learningstrategyid}, '${createDate}')`
    const data = await query(insertSQL)
    if(data.insertId) {
      return { code: 200, msg: '收藏成功' }
    } else {
      return { code: 401, msg: '收藏失败' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 取消收藏
export const disCollectLearning = async (params: DisCollectLearning) => {
  try {
    const {learningstrategyid, userid} = params
    const deleteSQL: string = `delete from learning_collection where userid=${userid} && learningstrategyid=${learningstrategyid}`
    const data = await query(deleteSQL)
    if(data.affectedRows) {
      return { code: 200, msg: '取消收藏成功' }
    } else {
      return { code: 401, msg: '取消收藏失败' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 插入评论信息
export const insertComment = async (params: LearningComment) => {
  try {
    const { userid, learningid, content }  = params
    const date = new Date()
    const insertSQL: string = `insert into learning_comment (userid, learningstrategyid, createDate, content) values (${userid}, ${learningid}, '${date}', '${content}')`
    const data = await query(insertSQL)
    if(data.insertId) {
      return { code: 200 }
    } else {
      return { code: 401, msg: '添加数据失败' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 评论列表
export const listComment = async (params: ListCommentPage) => {
  try {
    const {learningid, limit, offset} = params
    const selectSQL: string = `select * from learning_comment lc join user u on lc.userid=u.id where lc.learningstrategyid=${learningid} order by lc.createDate DESC limit ${limit} offset ${offset}`
    const data = await query(selectSQL)
    if(data.length) {
      return { code: 200, data, msg: '查询成功' }
    } else {
      return { code: 401, msg: '查询失败' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 查看是否点赞
export const isLike = async (params: isLikeLearning) => {
  try {
    const {learningstrategyid, userid} = params
    const selectSQL: string = `select * from learning_like where userid=${userid} && learningstrategyid=${learningstrategyid}`
    const data = await query(selectSQL)
    if(data.length) {
      return { code: 200, msg: '查询成功' }
    } else {
      return { code: 401, msg: '查询失败' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 查看点赞列表
export const likeList = async (userid: number) => {
  try {
    const selectSQL: string = `select * from learning_like ll join learningstrategy l on ll.learningstrategyid=l.id where ll.userid=${userid}`
    const data = await query(selectSQL)
    if(data.length) {
      return { code: 200, data, msg: '查询成功' }
    } else {
      return { code: 401, msg: '查询失败' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 点赞
export const likeLearning = async (params: LikeLearning) => {
  try {
    const {learningstrategyid, userid, createDate} = params
    const insertSQL: string = `insert into learning_like (userid, learningstrategyid, createDate) values (${userid}, ${learningstrategyid}, '${createDate}')`
    const data = await query(insertSQL)
    if(data.insertId) {
      return { code: 200, msg: '收藏成功' }
    } else {
      return { code: 401, msg: '收藏失败' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 取消点赞
export const disLikeLearning = async (params: DisLikeLearning) => {
  try {
    const {learningstrategyid, userid} = params
    const deleteSQL: string = `delete from learning_like where userid=${userid} && learningstrategyid=${learningstrategyid}`
    const data = await query(deleteSQL)
    if(data.affectedRows) {
      return { code: 200, msg: '取消收藏成功' }
    } else {
      return { code: 401, msg: '取消收藏失败' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 我的收藏
export const myCollect = async (userid: number) => {
  try {
    const selectSQL: string = `select * from learning_collection where userid=${userid}`
    const data = await query(selectSQL)
    if(data.length) {
      let res: LearningCollection[] = []
      for (const item of data) {
        const selectSql: string = `select * from learningstrategy where id=${item.learningstrategyid}`
        let result = await query(selectSql)
        res.push(...result)
      }
      return { code: 200, data: res, msg: '查询成功' }
    } else {
      return { code: 401, msg: '查询失败' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}