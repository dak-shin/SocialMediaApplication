const postResolvers = require('./posts');
const userResolvers = require('./users');
const commmentResolver = require('./comments');

module.exports = {
    // we can compute the fields like commentsCount and likesCount
    post:{
        likesCount(parent){
            return parent.likes.length;
        },
        commentsCount(parent){
            return parent.comments.length;
        }
    },
    Query : {...postResolvers.Query},
    Mutation : {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commmentResolver.Mutation
    },
    Subscription : {
        ...postResolvers.Subscription
    }
};