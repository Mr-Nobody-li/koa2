/*
 * @Author: Mr.Nobody
 * @Description:微信小程序的业务逻辑
 */
const util = require("util");
const axios = require("axios");
const { User } = require("../module/user");
const { generateToken } = require("../utils");
const Auth = require("../../middlewares/auth");

class Wx {
  static async code2token(code) {
    // 通过code 调用微信code2Session接口 获取openid, session_key
    const { AppID, AppSecret, code2SessionUrl } = global.config.wx;
    const url = util.format(code2SessionUrl, AppID, AppSecret, code);
    const { status, data } = await axios.get(url);
    const { errcode, errmsg, openid, session_key } = data;

    if (status !== 200) throw new global.err.AuthFail("openid获取失败");
    if (errcode) throw new global.err.AuthFail(errmsg);

    // 创建用户 返回token
    let user = await User.getUserByOpenid(openid);
    if (!user) {
      user = await User.registerByOpenid(openid);
    }

    return generateToken(user.id, Auth.USER);
  }
}

module.exports = {
  Wx,
};
