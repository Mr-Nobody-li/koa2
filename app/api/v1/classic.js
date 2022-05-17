/*
 * @Author: Mr.Nobody
 * @Date: 2022-04-11 23:44:23
 * @LastEditTime: 2022-05
 * @Description: classic api
 */
const Router = require("koa-router");
const router = new Router();
const { PositiveIntegerValidator } = require("../../validator/validator.js");
const Auth = require("../../../middlewares/auth");
const { Flow } = require("../../module/flow");

// demo
router.get("/v1/:id/classic", new Auth().m, async (ctx, next) => {
  // 校验id
  const v = await new PositiveIntegerValidator().validate(ctx);
  ctx.body = { key: "classic" };
});

/**
 * @description: 获取最新一个期刊(书、电影或歌曲的)
 * @return {*}
 */
router.get("/v1/classic/latest", new Auth().m, async (ctx, next) => {
  const index = Flow.findAll({
    order: ["index", "DESC"],
  });
  ctx.body = { index };
});

module.exports = router;
