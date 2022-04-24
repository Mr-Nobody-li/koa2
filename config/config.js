/*
 * @Author: Mr.Nobody
 * @Description:全局配置项
 */
module.exports = {
  environment: "dev",
  database: {
    dbName: "koa",
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
  },
  loginType: {
    USER_MINI_PROGRAM: 100,
    USER_EMAIL: 101,
    USER_MOBILE: 102,
    ADMIN_EMAIL: 200,
  },
  security: {
    secretKey: "faeaf",
    expiresIn: 60 * 60,
  },
};
