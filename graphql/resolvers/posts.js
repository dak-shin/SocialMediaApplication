const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/posts');
const { checkAuthToken } = require('../../util/checkToken');

module.exports = {
    Query : {
        async getPosts(){
            try{
                // console.log('get post query');
                const posts = await Post.find().sort( { createdAt: -1 } );
                return posts;
            }
            catch(error){
                throw new Error(error);
            }
        },
        async getPost(_, {postId}){
            try{
                const post = await Post.findById(postId);

                if(post){
                    return post;
                }
                else{
                    throw new Error('Post could no be found');
                }
            }
            catch(error){
                throw new Error('Error trying to find the post!!');
            }
        }
    },

    Mutation:{

        async createPost(_,{ body }, context){

            const user = checkAuthToken(context);

            // console.log(user);
            const newPost = new Post({
                body,
                username: user.username,
                user: user.id,
                timeAt: new Date().toISOString()
            });

            const f_post = await newPost.save();

            return f_post;
        },

        async deletePost(_,{ postId },context ){
            const user = checkAuthToken(context);

            const post = await Post.findById(postId);
            try{
                if(post)
                {
                    if(user.username === post.username)
                    {
                        await post.delete();
                        return "Post has been deleted successfully";
                    }
                    else{
                        throw new AuthenticationError('Action is not allowed');
                    }
                }
                else{
                    throw new Error('Post could not be found');
                }
            }
            catch(err){
                throw new Error(err);
            }
        }
    }
}