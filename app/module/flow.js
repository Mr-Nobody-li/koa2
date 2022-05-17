const { Sequelize, Model, DataTypes } = require("sequelize");
const { db } = require("../../core/db");

const classicFields = {
  // 期号
  index: DataTypes.INTEGER,
  // 表id
  artId: DataTypes.INTEGER,
  // 表示是哪个表
  type: DataTypes.INTEGER,
};

// Flow模型（表）
class Flow extends Model {}

Flow.init(classicFields, { sequelize: db });

module.exports = {
  Flow,
};
