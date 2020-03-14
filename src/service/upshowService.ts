import { query } from "../utils/query";

export const ranking = async () => {
  try {
    const selectSQl: string = `select experienceid from experience_like`;
    const res = await query(selectSQl);
    return res;
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

export const findUser = async (id: number) => {
  try {
    const selectSQl: string = `select * from experience e join user u on e.userid=u.id where e.id=${id}`
    const res = await query(selectSQl)
    return res
  } catch (error) {
    console.warn(error);
    return { code: 400, msg: "未知错误,查看服务器日志" };
  }
};

// export const findInfo = async (id: number) => {
//     try {
//       const selectSQl: string = `select * from experience e join user u on e.userid=u.id where e.id=${id}`
//       const res = await query(selectSQl)
//       return res
//     } catch (error) {
//       console.warn(error);
//       return { code: 400, msg: "未知错误,查看服务器日志" };
//     }
//   };
