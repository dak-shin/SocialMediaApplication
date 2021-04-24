const Post = require('../../models/posts');
const {checkAuthToken} = require('../../util/checkToken'); 
const {UserInputError, AuthenticationError} = require('apollo-server');

const commmentResolver = {
    Mutation:{
        createComment: async (_, {postId, body},context )=>{
            const {username} = checkAuthToken(context);

            if(body.trim() === ""){
                throw new UserInputError("Cannot post an empty comment",{
                    errors:{
                        body:"Comment cannot be empty"
                    }
                })
            }

            const post = await Post.findById(postId);

            if(post){
                post.comments.unshift({
                    body,
                    username,
                    timeAt: new Date().toISOString()
                })
                await post.save();
                return post;
            }
            else 
                throw new UserInputError("Counld not find the post");


        },
        
        deleteComment: async (_,{postId, commentId}, context) =>{

            const {username} = checkAuthToken(context);

            const post = await Post.findById(postId);

            if(post){

                const commmentIndex = post.comments.findIndex(c => c.id === commentId);

                if(post.comments[commmentIndex].username === username){
                    post.comments.splice(commmentIndex, 1);
                    await post.save();
                    return post;
                }
                else {
                    throw new AuthenticationError('Action is not allowed');
                }

            }
            else{
                throw new UserInputError("Post could not be found");
            }

        },

        likePost: async (_,{postId},context) => {
            const {username} = checkAuthToken(context);

            const post = await Post.findById(postId);

            if(post){

                if(post.likes.find(like => like.username === username))
                {
                    //Unlike the post 

                    post.likes = post.likes.filter(like => like.username !== username);

                }else{
                    //Like the post
                    post.likes.push({
                        username,
                        timeAt: new Date().toISOString()
                    });
                }

                await post.save();
                return post;
            }
            else{
                throw new UserInputError("Post does not exist");
            }
        }
    }
};

module.exports = commmentResolver;