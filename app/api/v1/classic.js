const Router = require("koa-router");
const router = new Router();
const { PositiveIntegerValidator } = require("../../validator/validator.js");

router.get("/v1/:id/classic", (ctx, next) => {
  // 校验id
  const v = new PositiveIntegerValidator().validate(ctx);
  ctx.body = { key: "classic" };
});

module.exports = router;
