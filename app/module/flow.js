/*
 * @Author: lipengfei
 * @Date: 2022-05
 * @LastEditors: lipengfei
 * @LastEditTime: 2022-05
 * @Description:flow模型 不同业务类型的期刊号
 */
const { Sequelize, Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../core/db");

const classicFields = {
  // 期号
  index: DataTypes.INTEGER,
  // 业务类型 这里的类型分为:100 电影 200 音乐 300 句子
  type: DataTypes.INTEGER,
  // 业务类型对应的表id
  art_id: DataTypes.INTEGER,
};

// Flow模型（表）
class Flow extends Model {}

Flow.init(classicFields, { sequelize });

module.exports = {
  Flow,
};
