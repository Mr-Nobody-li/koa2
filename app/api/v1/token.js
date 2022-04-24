/*
 * @Author: Mr.Nobody
 * @Description:登录校验接口
 */
const Router = require("koa-router");
const router = new Router();
const { TokenValidator } = require("../../validator/validator.js");
const { User } = require("../../module/user");

/**
 * @description: 登录校验
 * @param type {*} 登陆类型
 * @param account {*} 登陆账号
 * @param secret {*} 登陆密码
 * @return token {*} token
 */
router.post("/v1/token", async (ctx, next) => {
  // 校验传参
  const v = await new TokenValidator().validate(ctx);

  let token;

  // type：登陆类型 小程序、邮箱密码...
  switch (v.get("body.type")) {
    case global.config.loginType.USER_MINI_PROGRAM:
      break;
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

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret);
  const token = global.utils.generateToken(user.id, 2);
  return token;
}

module.exports = router;
