const { HttpException } = require("../core/http-exception");
// 全局异常处理中间件
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // 已知错误
    if (error instanceof HttpException) {
      ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = error.status;
    } else {
      // 未知错误
      if (global.config.environment === "dev") throw error;
      ctx.body = {
        msg: "未知错误",
        errorCode: 9999,
        requestUrl: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = 500;
    }
  }
};

module.exports = catchError;
