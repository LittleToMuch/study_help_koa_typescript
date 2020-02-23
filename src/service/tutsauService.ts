import { query } from "../utils/query";
import { Tutsau } from "../utils/tutsauType";

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
