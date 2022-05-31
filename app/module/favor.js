/*
 * @Author: lipengfei
 * @Date: 2022-05
 * @LastEditors: lipengfei
 * @LastEditTime: 2022-05
 * @Description:favor模型 用户对哪些业务类型点过赞
 */
const { Sequelize, Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../core/db");
const { Art } = require("./art");

class Favor extends Model {
  // 点赞
  static async like(art_id, type, uid) {
    // 判断有没有点赞记录
    const favor = await Favor.findOne({
      where: {
        art_id,
        uid,
        type,
      },
    });
    if (favor) throw new global.err.FavorError("已经点过赞了", 60001);
    // 事务
    try {
      sequelize.transaction(async (t) => {
        // 创建一条点赞记录
        await Favor.create(
          {
            art_id,
            uid,
            type,
          },
          { transaction: t }
        );
        // 点赞数加1
        const art = await Art.getData(art_id, type);
        await art.increment("favNums", { by: 1, transaction: t });
      });
    } catch (error) {
      throw new global.err.FavorError("点赞失败", 60001);
    }
  }
}

Favor.init(
  {
    // 用户id
    uid: DataTypes.INTEGER,
    // 业务类型对应的表id
    art_id: DataTypes.INTEGER,
    // 业务类型 这里的类型分为:100 电影 200 音乐 300 句子
    type: DataTypes.INTEGER,
  },
  { sequelize }
);

module.exports = {
  Favor,
};
