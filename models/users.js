const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email:String
},{
    timestamps:true
});

exports.module = model('User', userSchema);