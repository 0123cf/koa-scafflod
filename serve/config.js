const path = require("path")
const config = {
    email: {
        host: 'smtp.qq.com',
        auth: {
            user: '2416118450@qq.com',
            pass: 'uffgpbimwxccebie',
        },
        recipients: 'abc_xf@126.com'
    }
}

module.exports = {
    PORT: 3087,
    CORS: {
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
        maxAge: 100,
        credentials: true,
        allowMethods: ['GET', 'POST', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
    },
    LOGINFO: {
        appenders: {
            info: {
                type: "DateFile",
                category: 'dateFileLog',
                filename: path.join(__dirname, './log/info/'),
                pattern: "yyyy-MM-dd.log",
                alwaysIncludePattern: true
            },
            email: {
                type: '@log4js-node/smtp',
                 //发送邮件的邮箱
                sender: config.email.auth.user,
                 //标题
                subject: 'Latest error report',
                SMTP: {
                    host: config.email.host, 
                    auth: config.email.auth,
                },
                recipients: config.email.recipients
            }
        },
        categories: {
            default: { appenders: ['info'], level: 'info' },
            error: { appenders: ['info', 'email'], level: 'error' },
        }
    },
}