/*
 * @Author: Mr.Nobody
 * @Description:错误类型
 */
class HttpException extends Error {
  constructor(msg = "服务器异常", errorCode = 10000, status = 500) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
    this.status = status;
  }
}

class ParameterException extends HttpException {
  constructor(msg = "参数错误", errorCode = 10000) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
    this.status = 400;
  }
}

class NotFound extends HttpException {
  constructor(msg = "资源未找到", errorCode = 10000) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
    this.status = 404;
  }
}

class AuthFail extends HttpException {
  constructor(msg = "授权失败", errorCode = 10004) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
    this.status = 401;
  }
}

class Success extends HttpException {
  constructor(msg = "ok", errorCode = 0) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
    this.status = 200;
  }
}

class Forbidden extends HttpException {
  constructor(msg = "禁止访问", errorCode = 0) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
    this.status = 403;
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFail,
  Forbidden,
};
