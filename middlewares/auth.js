/*
 * @Author: Mr.Nobody
 * @Description:权限判断(客户端传过来的token验证)
 */
const auth = require("basic-auth");
const jwt = require("jsonwebtoken");
const { Forbidden } = require("../core/http-exception");

class Auth {
  constructor() {}
  get m() {
    return async (ctx, next) => {
      let decode;
      // 获取token
      const token = auth(ctx.req);
      if (!token || !token.name) {
        throw new Forbidden("没有token");
      }
      // 验证
      const { secretKey, expiresIn } = global.config.security;
      try {
        decode = jwt.verify(token.name, secretKey);
      } catch (error) {
        // token不合法/过期
        if (error.name === "TokenExpiredError") {
          throw new Forbidden("token过期");
        }
        throw new Forbidden("token不合法");
      }
      // 返回uid scope
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope,
      };
      await next();
    };
  }
}

module.exports = Auth;
