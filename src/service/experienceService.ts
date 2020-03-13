import { query } from "../utils/query";
import {
  Experience,
  isCollectExperience,
  CollectExperience,
  DisCollectExperience,
  ExperienceComment,
  ListCommentPage,
  isLikeExperience, LikeExperience, DisLikeExperience, ExperienceCollection
} from "../utils/experienceType";

export const insertExperience = async (params: Experience) => {
  try {
    const { title, content, createDate, category, pic, userid } = params;
    const inserSQL: string = `insert into experience (title, content, createDate, category, pic, userid) values ('${title}', '${content}', '${createDate}', '${category}', '${pic}', '${userid}')`;
    const res = await query(inserSQL);
    if (res.insertId) return { code: 200 };
    else return { code: 401, msg: "添加数据失败" };
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

export const selectExperience = async (id: number | undefined) => {
  try {
    const selectSQL = id ? `select * from experience where id=${id}` : `select * from experience`
    const data = await query(selectSQL)
    if(data.length) return { code: 200, data, msg: '查询成功' }
    else return { code: 401, msg: "查询失败" }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

export const deleteExperience = async (id: number) => {
  try {
    const deleteSQL = `delete from experience where id=${id}`
    const data = await query(deleteSQL)
    if(data.affectedRows) return { code: 200 }
    else return { code: 401, msg: '删除失败' }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 查看是否收藏
export const isCollection = async (params: isCollectExperience) => {
  try {
    const {experienceid, userid} = params
    const selectSQL: string = `select * from experience_collection where userid=${userid} && experienceid=${experienceid}`
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
export const collectExperience = async (params: CollectExperience) => {
  try {
    const {experienceid, userid, createDate} = params
    console.log(experienceid)
    const insertSQL: string = `insert into experience_collection (userid, experienceid, createDate) values (${userid}, ${experienceid}, '${createDate}')`
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
export const disCollectExperience = async (params: DisCollectExperience) => {
  try {
    const {experienceid, userid} = params
    const deleteSQL: string = `delete from experience_collection where userid=${userid} && experienceid=${experienceid}`
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
export const insertComment = async (params: ExperienceComment) => {
  try {
    const { userid, experienceid, content }  = params
    const date = new Date()
    const insertSQL: string = `insert into experience_comment (userid, experienceid, createDate, content) values (${userid}, ${experienceid}, '${date}', '${content}')`
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
    const {experienceid, limit, offset} = params
    const selectSQL: string = `select * from experience_comment ec join user u on ec.userid=u.id where ec.experienceid=${experienceid} order by ec.createDate DESC limit ${limit} offset ${offset}`
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
export const isLike = async (params: isLikeExperience) => {
  try {
    const {experienceid, userid} = params
    const selectSQL: string = `select * from experience_like where userid=${userid} && experienceid=${experienceid}`
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

// 点赞
export const likeExperience = async (params: LikeExperience) => {
  try {
    const {experienceid, userid, createDate} = params
    console.log(experienceid)
    const insertSQL: string = `insert into experience_like (userid, experienceid, createDate) values (${userid}, ${experienceid}, '${createDate}')`
    const data = await query(insertSQL)
    if(data.insertId) {
      return { code: 200, msg: '点赞成功' }
    } else {
      return { code: 401, msg: '点赞失败' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 取消点赞
export const dislikeExperience = async (params: DisLikeExperience) => {
  try {
    const {experienceid, userid} = params
    const deleteSQL: string = `delete from experience_like where userid=${userid} && experienceid=${experienceid}`
    const data = await query(deleteSQL)
    if(data.affectedRows) {
      return { code: 200, msg: '取消点赞成功' }
    } else {
      return { code: 401, msg: '取消点赞失败' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

// 我的收藏id
export const myCollect = async (userid: number) => {
  try {
    const selectSQL: string = `select * from experience_collection where userid=${userid}`
    const data = await query(selectSQL)
    if(data.length) {
      let res: ExperienceCollection[] = []
      for (const item of data) {
        const selectSql: string = `select * from experience where id=${item.experienceid}`
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


