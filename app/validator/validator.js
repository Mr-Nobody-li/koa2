const { loginType } = require("../../config/config");
const { LinValidator, Rule } = require("../../core/lin-validator-v2");
const { User } = require("../module/user");

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule("isInt", "需要正整数", { min: 1 })];
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [new Rule("isEmail", "不符合email规范")];
    this.password1 = [
      new Rule("isLength", "至少六位", {
        min: 6,
        max: 32,
      }),
    ];
    this.password2 = this.password1;
    this.nickName = [
      new Rule("isLength", "至少六位", {
        min: 6,
        max: 32,
      }),
    ];
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;
    if (psw1 !== psw2) {
      throw new Error("密码要一样");
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      throw new Error("email已存在");
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super();
    this.secret = [
      new Rule("isOptional"),
      new Rule("isLength", "六个字符", {
        min: 6,
        max: 128,
      }),
    ];
  }
  validateLoginType(vals) {
    if (!vals.body.type) throw new Error("type必传");
    if (!Object.values(global.config.loginType).includes(vals.body.type))
      throw new Error("type不合法");
  }
}

class verifyToken extends LinValidator {
  constructor() {
    super();
    this.token = [
      new Rule("isLength", "不能为空", {
        min: 1,
      }),
    ];
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  verifyToken,
};
