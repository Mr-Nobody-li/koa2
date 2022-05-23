/*
 * @Author: lipengfei
 * @Date: 2022-05
 * @LastEditors: lipengfei
 * @LastEditTime: 2022-05
 * @Description:
 */
const { Sequelize, Model, DataTypes } = require("sequelize");
const { db } = require("../../core/db");

const classicFields = {
  // 期号
  index: DataTypes.INTEGER,
  // 表示是哪个表 这里的类型分为:100 电影 200 音乐 300 句子
  type: DataTypes.INTEGER,
  // 表id
  art_id: DataTypes.INTEGER,
};

// Flow模型（表）
class Flow extends Model {}

Flow.init(classicFields, { sequelize: db });

module.exports = {
  Flow,
};
