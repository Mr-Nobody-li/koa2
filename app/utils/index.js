/*
 * @Author: Mr.Nobody
 * @Description:公用方法
 */
const { Success } = require("../../core/http-exception");
const jwt = require("jsonwebtoken");

const success = (msg, errorCode) => {
  const error = new Success(msg, errorCode);
  throw error;
};

// 生成token
const generateToken = (uid, scope) => {
  const { secretKey, expiresIn } = global.config.security;
  const token = jwt.sign(
    {
      uid,
      scope,
    },
    secretKey,
    { expiresIn }
  );
  return token;
};

module.exports = {
  success,
  generateToken,
};
