/*
 * @Author: lipengfei
 * @Date: 2022-04
 * @LastEditors: lipengfei
 * @LastEditTime: 2022-05
 * @Description:登录校验接口
 */

const Router = require("koa-router");
const router = new Router();
const { TokenValidator, verifyToken } = require("../../validator/validator.js");
const { User } = require("../../module/user");
const { Wx } = require("../../services/wx");
const Auth = require("../../../middlewares/auth.js");

/**
 * @description: 登录校验
 * @param type {string} 登陆类型
 * @param account {string} 登陆账号(不同登陆类型下账号不同)
 * @param secret {string} 登陆密码（可选，不同登陆类型下密码不同）
 * @return token {string} token
 */
router.post("/v1/token", async (ctx, next) => {
  // 校验传参
  const v = await new TokenValidator().validate(ctx);

  let token;

  // 登陆类型
  switch (v.get("body.type")) {
    // 小程序登录
    case global.config.loginType.USER_MINI_PROGRAM:
      token = await Wx.code2token(v.get("body.account"));
      break;
    // 邮箱密码
    case global.config.loginType.USER_EMAIL:
      token = await emailLogin(v.get("body.account"), v.get("body.secret"));
      break;
    case global.config.loginType.USER_MOBILE:
      break;
    case global.config.loginType.ADMIN_EMAIL:
      break;
    default:
      break;
  }

  ctx.body = {
    token,
  };
});

/**
 * @description: 校验token
 * @param token {string} token
 * @return result {boolean} token是否正确
 */
router.post("/v1/verify", async (ctx, next) => {
  // 校验传参
  const v = await new verifyToken().validate(ctx);
  ctx.body = {
    result: Auth.verifyToken(v.get("body.token")),
  };
});

// 邮箱密码登陆
async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret);
  const token = global.utils.generateToken(user.id, Auth.USER);
  return token;
}

module.exports = router;
