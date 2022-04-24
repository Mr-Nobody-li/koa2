const Router = require("koa-router");
const requireDirectory = require("require-directory");
const utils = require("../app/utils/index");

class initManager {
  // 初始化
  static initCore(app) {
    this.loadConfig();
    this.initLoadRouter(app);
  }
  // 初始化路由
  static initLoadRouter(app) {
    const visit = (obj) => {
      if (obj instanceof Router) {
        app.use(obj.routes());
      }
    };
    const apiDirectory = `${process.cwd()}/app/api`;
    requireDirectory(module, apiDirectory, { visit });
  }
  // 初始化配置文件
  static loadConfig() {
    const configPath = process.cwd() + "/config/config.js";
    const config = require(configPath);
    global.config = config;
    global.utils = utils;
  }
}

module.exports = initManager;
