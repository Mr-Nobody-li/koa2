const bcryptjs = require("bcryptjs");
const { Sequelize, Model } = require("sequelize");
const { sequelize } = require("../../core/db");

// User模型（表）
class User extends Model {
  // 验证邮箱和密码
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) throw new global.err.AuthFail("账号不存在");

    // 判断传入的密码和数据库中的是否一致
    const isCorrect = bcryptjs.compareSync(plainPassword, user.password);
    if (!isCorrect) throw new global.err.AuthFail("密码错误");
    return user;
  }

  // 通过微信openid获取用户
  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where: { openid },
    });
    return user;
  }

  // 通过微信openid注册用户
  static async registerByOpenid(openid) {
    const user = await User.create({
      openid,
    });
    return user;
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        // 密码加密
        const salt = bcryptjs.genSaltSync();
        const password = bcryptjs.hashSync(val, salt);
        this.setDataValue("password", password);
      },
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true,
    },
  },
  { sequelize }
);

module.exports = {
  User,
};
