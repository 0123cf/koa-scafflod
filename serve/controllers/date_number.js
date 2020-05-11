const DateNumber = require('../models/dateNumber')

class DateNumberController {
    prefix = ''
    getPath(name){
        return `/${this.prefix}/${name}`
    }
    async add(ctx, next){
        ctx.verifyParams({
            date: { type: "string", required: true },
            list: { type: "array", required: true },
        })
        const {date, list} = ctx.request.body
        const [err, data] = await to( new DateNumber({date, list}).save() )
        if(err) return ctx.throw(500, err)
        ctx.response.body = data
    }
    async find(ctx, next){
        const data = await DateNumber.find()
        ctx.response.body = data.join('\n')
        log.info('find')
    }
    async delect (ctx, next){
        ctx.verifyParams({
            date: { type: "string", required: true },
        })
        const {date} = ctx.request.body
        const data = await DateNumber.deleteOne({date: date})
        ctx.response.body = data
    }
    async update(ctx, next){
        ctx.verifyParams({
            date: { type: "string", required: true },
            list: { type: "array", required: true },
        })
        const {date, list} = ctx.request.body
        const [err, data] = await to( DateNumber.updateOne({date}, {$set: {list}}) )
        if(err) return ctx.throw(500, err)
        ctx.response.body = data
    }
}

module.exports = new DateNumberController()