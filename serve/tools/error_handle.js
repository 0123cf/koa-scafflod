const ErrorHandle = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        let status = err.statusCode || err.status || 500
        // --- 正常错误---
        // 数据库错误 key值重复
        if(err.code === 11000){
            log.info({ message: err.message })
            status = 423
        }
        ctx.response.status = status
        ctx.response.body = {
            message: err.message
        }
        // ---- 严重 ---
        // 代码错误（数据库、逻辑等）
        if(status === 500){
            log.error({ err })
            return
        }
    }
}
module.exports = () => ErrorHandle