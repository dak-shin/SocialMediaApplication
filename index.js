const { ApolloServer , gql} = require('apollo-server');
const mongoose = require('mongoose');
const { MONGOURL } = require('./config');

// const user = require('./models/users');
// const post = require('./models/posts');

//Basic Apollo server setup.

const typeDefs = gql`
    type Query{
        sayHi : String!
    }
`

const resolvers = {
    Query : {
        sayHi : () => "Hello there!!"
    }
}

const server = new ApolloServer({typeDefs , resolvers});


mongoose.connect(MONGOURL, {useNewUrlParser : true})
.then(() => {
    console.log('Connected to database successfully');
    return server.listen({port : 6969});
})
.then(res => {
    console.log(`Server is running at ${res.url}`);
})