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
  wx: {
    AppID: "wxc84b7729a71d20d9",
    AppSecret: "00e57b37511260cb06f440e5d8944ae1",
    code2SessionUrl:
      "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code",
  },
};
