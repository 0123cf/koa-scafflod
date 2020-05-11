const Koa = require('koa');
const cors = require('koa2-cors')
const parameter = require("koa-parameter")
const error = require("koa-json-error")
const bodyparser = require('koa-bodyparser')
const log4js = require('log4js')
const {to} = require('await-to-js')
const ErrorHandle = require('./tools/error_handle')
const {PORT, CORS, LOGINFO} = require('./config')
const router = require('./routers')
const mongoose = require('./db')

const app = new Koa()

log4js.configure(LOGINFO)
const log_info = log4js.getLogger()
const log_error = log4js.getLogger('error')

app.use(ErrorHandle())
app.use(bodyparser())
app.use(router.routes());
app.use(parameter(app));
app.use(
    error({ postFormat: (e, { stack, ...rest }) => ({ stack, rest }) })
)
app.use(cors(CORS))
app.listen(PORT);
global.to = to
global.log = {
    debug: log_info.debug.bind(log_info),
    info: log_info.info.bind(log_info),
    warn: log_info.warn.bind(log_info),
    error: log_error.error.bind(log_error),
    fatal: log_error.fatal.bind(log_error),
}
setTimeout(() => {
    log.info({
        msg: '测试',
        err: 'fatal'
    })
}, 400)
console.log(`app started at port ${PORT}...`)