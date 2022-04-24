const Router = require("koa-router");
const router = new Router({ prefix: "/v1/user" });
const { RegisterValidator } = require("../../validator/validator.js");
const { User } = require("../../module/user");

router.post("/register", async (ctx, next) => {
  // 校验传参
  const v = await new RegisterValidator().validate(ctx);

  // 插入一行数据到User模型
  const user = {
    email: v.get("body.email"),
    password: v.get("body.password1"),
    nickname: v.get("body.nickName"),
  };

  // 返回这行数据
  const r = await User.create(user);
  global.utils.success();
});

module.exports = router;
