import { query } from "../utils/query";
import { Video, Select, VideoCategory } from '../utils/videoType';

export const videoInsert = async (params: Video) => {
  try {
    const { category, video_name, video_pic, video_path, video_intro, video_price, adminId } = params;

    const hasVideoSQL: string = `select id from video where video.video_name='${video_name}'`

    const hasVideo = await query(hasVideoSQL)
    if (!hasVideo.length) {
      const insertSQL: string = `insert into video (category, video_name, video_pic, video_path, video_intro, video_price, adminId, createDate, del) values ('${category}', '${video_name}', '${video_pic}', '${video_path}', '${video_intro}', ${video_price}, ${adminId}, '${new Date()}', 0)`;
      const res = await query(insertSQL);
      if (res.insertId) return { code: 200, msg: '添加视频成功' }
    } else {
      return { code: 401, msg: '视频名称重复' }
    }
  } catch (err) {
    return { code: 400, msg: '未知错误，请查看服务器日志' }
  }
};

export const videoList = async (params: Select) => {
  try {
    const {id, pageSize, currentPage} = params
    let selectSQL: string = ''
    if (id) {
      selectSQL = `select * from video where id=${id} && del=0`
    } else {
      if (pageSize && currentPage) {
        selectSQL = `select * from video where del=0 limit ${pageSize} offset ${(currentPage - 1) * pageSize}`
      } else {
        selectSQL = `select * from video where del=0`
      }
    }
    const totalSQL = `select count(id) from video where del=0`
    const data = await query(selectSQL)
    const total = await query(totalSQL)
    if(data.length) return { code: 200, data, total: total[0]['count(id)'], msg: '查询成功' }
    else return { code: 401, msg: "查询失败" }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

export const videoCategoryList = async (category: VideoCategory) => {
  try {
    const selectSQL = `select * from video where category='${category}' && del=0`
    const data = await query(selectSQL)
    if (data.length) {
      return { code: 200, data, msg: '查询成功' }
    } else {
      return { code: 401, msg: '查询失败' }
    }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

export const videoUpdate = async (params: Video) => {
  try {
    const { id, category, video_name, video_pic, video_path, video_intro, video_price } = params;
    const updateSQL = `update video set category='${category}', video_name='${video_name}', video_pic='${video_pic}', video_path='${video_path}', video_intro='${video_intro}', video_price=${video_price} where id=${id}`
    const res = await query(updateSQL)
    if(res.affectedRows) return { code: 200, msg: '更新成功' }
    else return { code: 401, msg: "更新失败" }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}

export const videoDel = async (id: number) => {
  try {
    const delSQL = `update video set del=1 where id=${id}`
    const res = await query(delSQL)
    if(res.affectedRows) return { code: 200, msg: '删除成功' }
    else return { code: 401, msg: '删除失败' }
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
}