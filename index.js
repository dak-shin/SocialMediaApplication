const { ApolloServer , gql} = require('apollo-server');
const mongoose = require('mongoose');
const { MONGOURL } = require('./config');

const User = require('./models/users');
const Post = require('./models/posts');

//Basic Apollo server setup.

const typeDefs = gql`
    type post{
        id: ID!
        body: String!
        username: String!
        timeAt: String!
    }
    type Query{
        getPosts: [post]
    }
`;

const resolvers = {
    Query : {
        async getPosts(){
            try{
                const posts = await Post.find();
                return posts;
            }
            catch(error){
                throw new Error(error);
            }
        }
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