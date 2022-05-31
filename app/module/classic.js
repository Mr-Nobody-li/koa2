/*
 * @Author: Mr.Nobody
 * @Date: 2022-05-15 14:14:32
 * @LastEditTime: 2022-05
 * @Description:音乐、书、电影表
 */
const { Sequelize, Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../core/db");

const classicFields = {
  image: DataTypes.STRING,
  // 期刊内容
  content: DataTypes.STRING,
  // 发布日期
  pubdate: DataTypes.DATEONLY,
  // 点赞次数
  favNums: DataTypes.INTEGER,
  // 期刊题目
  title: DataTypes.STRING,
  // 期刊类型,这里的类型分为:100 电影 200 音乐 300 句子
  type: DataTypes.TINYINT,
};

// Movie模型（表）
class Movie extends Model {}

// Movie模型（表）
class Sentence extends Model {}

// Movie模型（表）
class Music extends Model {}

Movie.init(classicFields, { sequelize });
Sentence.init(classicFields, { sequelize });
Music.init({ url: DataTypes.STRING, ...classicFields }, { sequelize });

module.exports = {
  Movie,
  Sentence,
  Music,
};
