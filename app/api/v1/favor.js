/*
 * @Author: Mr.Nobody
 * @Date: 2022-04-11 23:44:23
 * @LastEditTime: 2022-05
 * @Description: 点赞相关 api
 */
const Router = require("koa-router");
const router = new Router();
const { FavorValidator } = require("../../validator/validator.js");
const Auth = require("../../../middlewares/auth");
const { Favor } = require("../../module/favor");

/**
 * @description: 对期刊(书、电影或歌曲)点赞
 * @param art_id {number} 期刊id
 * @param type {number} 期刊类型
 * @return {*}
 */
router.post("/v1/like", new Auth().m, async (ctx, next) => {
  // 校验传参
  const v = await new FavorValidator().validate(ctx);
  // 点赞
  await Favor.like(v.get("body.art_id"), v.get("body.type"), ctx.auth.uid);
  // global.utils.success();
});

/**
 * @description: 对期刊(书、电影或歌曲)取消点赞
 * @return {*}
 */
router.post("/v1/unlike", new Auth().m, async (ctx, next) => {});

module.exports = router;
