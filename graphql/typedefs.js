const { gql} = require('apollo-server');

module.exports = gql`
    
    type Comment{
        id: ID!
        body: String!
        username: String!
        timeAt: String!
    }
    type Like{
        id: ID!
        username: String!
        timeAt: String!
    }
    type post{
        id: ID!
        body: String!
        username: String!
        timeAt: String!
        comments: [Comment]!
        likes: [Like]!
        likesCount: Int!
        commentsCount: Int!
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
        getPost(postId: ID!): post!
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
        createPost(body: String!): post!
        deletePost(postId: ID!):String!
        createComment(postId: ID!, body: String!): post!
        deleteComment(postId: ID!, commentId: ID!): post!
        likePost(postId: ID!): post!
    }

    type Subscription{
        newPost: post!
    }
`;

