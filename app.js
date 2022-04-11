const Koa = require('koa')
const initManager = require('./core/init.js')
const catchError = require('./middlewares/exception.js')

const app = new Koa()

app.use(catchError)
initManager.initCore(app)

app.listen(3000)
