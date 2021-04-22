const {model, Schema} = require('mongoose');

const commentSchema = new Schema({
    body:String,
    username:String,
    timeAt:String
},{
    timestamps:true
})

const likeSchema = new Schema({
    username:String,
    timeAt:String
},{
    timestamps:true
})

const postSchema = new Schema({
    body : String,
    username : String, 
    timeAt : String,
    comments: [commentSchema],
    likes: [likeSchema],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
},{
    timestamps:true
})

module.exports = model ('post', postSchema);