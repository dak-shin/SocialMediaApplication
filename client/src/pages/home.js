import React from 'react'
import {useQuery, gql} from '@apollo/client';
import {Grid, GridColumn} from 'semantic-ui-react';
import PostCard from '../components/postCard';

const FETCH_POSTS_QUERY = gql`
    {
         getPosts{
             id
             body
             timeAt
             username
             likesCount
             commentsCount
             likes{
                 username
             }
             comments{
                 id
                 username
                 body
                 timeAt
             }
         }
    }
`



function Home() {
    
    const {loading, data} = useQuery(FETCH_POSTS_QUERY);
    if(data)
    {
        const {getPosts: posts} = data;
        return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h2>Recent Posts</h2>
            </Grid.Row>
            <Grid.Row>
                {loading?(
                    <h3>Loading new posts.....</h3>
                ):(
                    posts && posts.map(post => (
                        
                        <Grid.Column key={post.id} style={{ marginBottom: 20}}>
                            <PostCard props={post}/>
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>);
    }
    return (<h2>No post available</h2>);
    
    
    
}

export default Home;