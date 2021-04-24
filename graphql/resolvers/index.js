const postResolvers = require('./posts');
const userResolvers = require('./users');
const commmentResolver = require('./comments');

module.exports = {
    Query : {...postResolvers.Query},
    Mutation : {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commmentResolver.Mutation
    }
};