const Koa = require("koa");
const parser = require("koa-bodyparser");
const initManager = require("./core/init.js");
const catchError = require("./middlewares/exception.js");

const app = new Koa();
app.use(catchError);
app.use(parser());
initManager.initCore(app);

app.listen(3000);
