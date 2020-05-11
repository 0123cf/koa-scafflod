const mongoose = require('mongoose');  
const { Schema, model } = mongoose;

// 期号的数据库模型  
let DateNumberSchema = new Schema({
    date: { type: String, required: true, unique: true },
    list: { type: Array, require: true },
});

module.exports = model('DateNumber', DateNumberSchema);