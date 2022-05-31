/*
 * @Author: lipengfei
 * @Date: 2022-04
 * @LastEditors: lipengfei
 * @LastEditTime: 2022-05
 * @Description: 连接mysql数据库
 */
const { Sequelize } = require("sequelize");
const { dbName, host, port, user, password } =
  require("../config/config").database;

const sequelize = new Sequelize(dbName, user, password, {
  dialect: "mysql",
  host,
  port,
  logging: console.log,
  timezone: "+08:00",
  define: {
    // 表名与module名一致
    freezeTableName: true,
    // 建表时自动创建createdAt、updatedAt字段
    timestamps: true,
  },
});

sequelize.sync({ force: false });
console.log("所有模型均已成功同步.");

module.exports = {
  sequelize,
};
