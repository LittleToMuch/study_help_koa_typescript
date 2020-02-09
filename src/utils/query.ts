import * as mysql from "mysql";
import * as MYSQL_CONFIG from "../config/mysql.config"; //数据库配置

//mysql
const pool: mysql.Pool = mysql.createPool(MYSQL_CONFIG.mysqlConfig);

//query sql语句入口
export const query = (sql: string) => {
  return new Promise((resolve: (result: any) => void, reject) => {
    pool.getConnection(
      (err: mysql.MysqlError, connection: mysql.PoolConnection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(sql, (err: never, result: any, fields) => {
            if (err) reject(err);
            else resolve(result);
            connection.release();
          });
        }
      }
    );
  });
};
