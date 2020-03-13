import { query } from "../utils/query";
import { Tutsau, UserId, TutsauComment, ListCommentPage, CollectTutsau, DisCollectTutsau, isCollectTutsau } from "../utils/tutsauType";

export const insertTutsau = async (params: Tutsau) => {
  try {
    const { title, content, createDate, category, pic, userid } = params;
    const inserSQL: string = `insert into tutsau (title, content, createDate, category, pic, userid) values ('${title}', '${content}', '${createDate}', '${category}', '${pic}', '${userid}')`;
    const res = await query(inserSQL)
    if(res.insertId) return { code: 200 }
    else return {code: 401, msg: '添加数据失败'}
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

export const tutsauList = async () => {
  try {
    const selectSQL: string = `select * from tutsau`
    const data: Tutsau[] = await query(selectSQL)
    if (data.length) {
      return { code: 200, data }
    } else {
      return { code: 404, msg: '没有此分类数据' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

export const tutsauByUser = async (userid: UserId) => {
  try {
    const selectSQL: string = `select * from tutsau where userid='${userid}'`
    const data: Tutsau[] = await query(selectSQL)
    if (data.length) {
      return { code: 200, data }
    } else {
      return { code: 404, msg: '您还没有吐槽哦' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

export const delTutsau = async (tutsauId: number) => {
  try {
    const deleteSQL: string = `delete from tutsau where id='${tutsauId}'`
    const data = await query(deleteSQL)
    if(data.affectedRows) return { code: 200 }
    else return { code: 401, msg: '删除失败' }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 根据id查吐槽
export const findTutsau = async (tutsauId: number) => {
  try {
    const selectSQL: string = `select * from tutsau where id='${tutsauId}'`
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

// 插入评论信息
export const insertComment = async (params: TutsauComment) => {
  try {
    const { userid, tutsauid, content }  = params
    const date = new Date()
    const insertSQL: string = `insert into tutsau_comment (userid, tutsauid, createDate, content) values (${userid}, ${tutsauid}, '${date}', '${content}')`
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
    const {tutsauid, limit, offset} = params
    const selectSQL: string = `select * from tutsau_comment tc join user u on tc.userid=u.id where tc.tutsauid=${tutsauid} order by tc.createDate DESC limit ${limit} offset ${offset}`
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

// 收藏
export const collectTutsau = async (params: CollectTutsau) => {
  try {
    const {tutsauid, userid, createDate} = params
    const insertSQL: string = `insert into tutsau_collection (userid, tutsauid, createDate) values (${userid}, ${tutsauid}, '${createDate}')`
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
export const disCollectTutsau = async (params: DisCollectTutsau) => {
  try {
    const {tutsauid, userid} = params
    const deleteSQL: string = `delete from tutsau_collection where userid=${userid} && tutsauid=${tutsauid}`
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

// 查看是否收藏
export const isCollection = async (params: isCollectTutsau) => {
  try {
    const {tutsauid, userid} = params
    const selectSQL: string = `select * from tutsau_collection where userid=${userid} && tutsauid=${tutsauid}`
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

