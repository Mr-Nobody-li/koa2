const Router = require("koa-router");
const requireDirectory = require("require-directory");

class initManager {
  // 初始化
  static initCore(app) {
    this.loadGlobal();
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
  // 初始化全局对象
  static loadGlobal() {
    const configPath = process.cwd() + "/config/config.js";
    const utilsPath = process.cwd() + "/app/utils/index.js";
    const errPath = process.cwd() + "/core/http-exception.js";
    const config = require(configPath);
    const utils = require(utilsPath);
    const err = require(errPath);
    global.config = config;
    global.utils = utils;
    global.err = err;
  }
}

module.exports = initManager;
