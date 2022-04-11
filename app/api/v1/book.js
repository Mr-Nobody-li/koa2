const Router = require("koa-router");
const {
  HttpException,
  ParameterException,
} = require("../../../core/http-exception");
const router = new Router();

router.get("/v1/book", (ctx, next) => {
  // 参数不能为空
  if (Object.keys(ctx.query).length === 0) {
    const error = new ParameterException();
    throw error;
  }
  ctx.body = { key: "bookaaaa" };
});

module.exports = router;
