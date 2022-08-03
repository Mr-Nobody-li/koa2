/*
 * @Author: Mr.Nobody
 * @Date: 2022-04-11 23:44:23
 * @LastEditTime: 2022-08
 * @Description: classic api
 */
const Router = require("koa-router");
const router = new Router();
const {
  PositiveIntegerValidator,
  NotValidator,
} = require("../../validator/validator.js");
const Auth = require("../../../middlewares/auth");
const { Flow } = require("../../module/flow");
const { Art } = require("../../module/art.js");
const { Favor } = require("../../module/favor.js");

// demo
router.get("/v1/:id/classic", new Auth().m, async (ctx, next) => {
  // 校验id
  const v = await new PositiveIntegerValidator().validate(ctx);
  ctx.body = { key: "classic" };
});

/**
 * @description: 获取最新一个期刊(书、电影或歌曲的)
 * @return {}
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

/**
 * @description: 获取下一个期刊
 * @param index {string} flow表中的index字段，期刊号
 * @return {*}
 */
router.get("/:index/next", new Auth().m, async (ctx, next) => {
  const v = await new NotValidator().validate(ctx);
  const index = v.get("path.index");
  console.log(`🚀 => router.get => index`, index - 0 + 1);
  const flow = await Flow.findOne({
    where: {
      index: index - 0 + 1,
    },
  });
  if (!flow) {
    throw new global.err.NotFound();
  }

  let art = await Art.getData(flow.art_id, flow.type);
  const likeNext = await Favor.isUserLike(flow.art_id, flow.type, ctx.auth.uid);

  art.setDataValue("index", flow.index);
  art.setDataValue("like_status", likeNext);

  ctx.body = {
    art,
  };
});

/**
 * @description: 获取上一个期刊
 * @param index {string} flow表中的index字段，期刊号
 * @return {*}
 */
router.get("/:index/previous", new Auth().m, async (ctx, next) => {
  const v = await new NotValidator().validate(ctx);
  const index = v.get("path.index");
  const flow = await Flow.findOne({
    where: {
      index: index - 1,
    },
  });
  if (!flow) {
    throw new global.err.NotFound();
  }

  let art = await Art.getData(flow.art_id, flow.type);
  const likePrevious = await Favor.isUserLike(
    flow.art_id,
    flow.type,
    ctx.auth.uid
  );

  art.setDataValue("index", flow.index);
  art.setDataValue("like_status", likePrevious);

  ctx.body = {
    art,
  };
});

/**
 * @description: 获取期刊点赞情况
 * @param index {string} flow表中的index字段，期刊号
 * @return {
 *  fav_nums:number  该期刊点赞数量
 *  like_status:boolean 当前用户是否点赞了该期刊
 * }
 */
router.get("/:type/:id/favor", new Auth().m, async (ctx) => {
  const v = await new NotValidator().validate(ctx);
  const id = v.get("path.id");
  const type = parseInt(v.get("path.type"));
  const art = await Art.getData(id, type);
  const like = await Favor.isUserLike(id, type, ctx.auth.uid);
  if (!art) throw new global.err.NotFound();
  ctx.body = {
    fav_nums: art.fav_nums,
    like_status: like,
  };
});

/**
 * @description: 获取某个用户喜欢的期刊
 * @return classicInfo[] classicInfo：期刊详情
 */
router.get("/favor", new Auth().m, async (ctx) => {
  const uid = ctx.auth.uid;
  ctx.body = await Favor.getUserFavorList(uid);
});

module.exports = router;
