const { ApolloServer , gql, PubSub} = require('apollo-server');
const mongoose = require('mongoose');
const { MONGOURL } = require('./config');


const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers/index');


//Basic Apollo server setup.

const pubsub = new PubSub()

const server = new ApolloServer({typeDefs , resolvers, context: ({req}) =>({req,pubsub}) });


mongoose.connect(MONGOURL, {useNewUrlParser : true})
.then(() => {
    console.log('Connected to database successfully');
    return server.listen({port : 6969});
})
.then(res => {
    console.log(`Server is running at ${res.url}`);
})