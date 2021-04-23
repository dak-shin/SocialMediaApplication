const { gql} = require('apollo-server');

module.exports = gql`
    type post{
        id: ID!
        body: String!
        username: String!
        timeAt: String!
    }

    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        timeAt: String! 
    }

    type Query{
        getPosts: [post]
    }

    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username:String!, password:String!): User!
    }

`;

