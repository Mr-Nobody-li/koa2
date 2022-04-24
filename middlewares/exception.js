const { HttpException } = require("../core/http-exception");
// 全局异常处理中间件
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const isHttpException = error instanceof HttpException;
    const isDev = global.config.environment === "dev";

    // 由于代码异常引起的报错为了方便排查需要抛出。生产环境看不到输出信息不用管
    if (!isHttpException && isDev) {
      throw error;
    }

    // 已知错误
    if (isHttpException) {
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
