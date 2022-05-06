/*
 * @Author: Mr.Nobody
 * @Description:权限判断(客户端传过来的token验证)
 */
const auth = require("basic-auth");
const jwt = require("jsonwebtoken");

class Auth {
  constructor(level) {
    // 权限控制(暂时)
    this.level = level || 1; // 接口的权限等级
    Auth.USER = 8; // 用户
    Auth.ADMIN = 16; // 管理员
    Auth.SPUSER_ADMIN = 32; // 超级管理员
  }
  get m() {
    return async (ctx, next) => {
      let decode;
      // 获取客户端传过来的token
      const token = auth(ctx.req);
      if (!token || !token.name) {
        throw global.err.Forbidden("没有token");
      }
      // 验证
      const { secretKey, expiresIn } = global.config.security;
      try {
        decode = jwt.verify(token.name, secretKey);
      } catch (error) {
        // token不合法/过期
        if (error.name === "TokenExpiredError") {
          throw global.err.Forbidden("token过期");
        }
        throw global.err.Forbidden("token不合法");
      }
      // 权限判断
      if (decode.scope < this.level) {
        throw global.err.Forbidden("权限不足");
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