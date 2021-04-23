const Post = require('../../models/posts');

module.exports = {
    Query : {
        async getPosts(){
            try{
                // console.log('get post query');
                const posts = await Post.find();
                return posts;
            }
            catch(error){
                throw new Error(error);
            }
        }
    }
}