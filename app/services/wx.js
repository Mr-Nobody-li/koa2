/*
 * @Author: Mr.Nobody
 * @Description:微信小程序的业务逻辑
 */
const util = require("util");
const axios = require("axios");

class Wx {
  static async code2Session(code) {
    console.log(`🚀 => Wx => code2Session => code`, code);
    const { AppID, AppSecret, code2SessionUrl } = global.config.wx;
    const url = util.format(code2SessionUrl, AppID, AppSecret, code);
    const res = await axios.get(url);
    throw new global.err.AuthFail("密码错误");
    if (res.status !== 200) {
      throw new global.err.AuthFail();
    }
  }
}

module.exports = {
  Wx,
};
