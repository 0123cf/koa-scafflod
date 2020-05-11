const mongoose = require('mongoose')
const DB_ADDRESS = "mongodb://localhost:27017/db"
mongoose.connect(DB_ADDRESS, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if (err) {
        log.fatal({msg: '[Mongoose] database connect failed!', err})
    } else {
        console.log('[Mongoose] database connect success!')
    }
})
module.exports = mongoose