/*
 * @Author: Mr.Nobody
 * @Description:claasic接口
 */
const Router = require("koa-router");
const router = new Router();
const { PositiveIntegerValidator } = require("../../validator/validator.js");
const Auth = require("../../../middlewares/auth");
router.get("/v1/:id/classic", new Auth().m, async (ctx, next) => {
  // 校验id
  const v = await new PositiveIntegerValidator().validate(ctx);
  ctx.body = { key: "classic" };
});

module.exports = router;
