import * as mysql from "mysql";
import * as MYSQL_CONFIG from "../config/mysql.config"; //数据库配置

//mysql
const pool: mysql.Pool = mysql.createPool(MYSQL_CONFIG.mysqlConfig);

//query sql语句入口
export const query = (options: string | mysql.QueryOptions) => {
  return new Promise((resolve: (value?: any) => void, reject: (reason: any) => void) => {
    pool.getConnection(
      (err: mysql.MysqlError, connection: mysql.PoolConnection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(options, (err: mysql.MysqlError | null, result: any, fields: mysql.FieldInfo[] | undefined) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
            connection.release();
          });
        }
      }
    );
  });
};
