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
const { Art } = require("../../module/art.js");

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
  // 获取最新期刊对应的实体表id
  const flow = await Flow.findOne({
    order: [["index", "DESC"]],
  });
  // 获取实体表最新一条数据
  const art = await Art.getData(flow.art_id, flow.type);
  // 设置器 https://www.sequelize.com.cn/core-concepts/getters-setters-virtuals
  art.setDataValue("index", flow.index);
  ctx.body = art;
});

module.exports = router;
