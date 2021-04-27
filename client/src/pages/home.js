import React,{useContext} from 'react'
import {useQuery, gql} from '@apollo/client';
import {Grid} from 'semantic-ui-react';

import {AuthContext } from '../context/auth';

import PostForm from '../components/postForm';
import PostCard from '../components/postCard';
import {FETCH_POSTS_QUERY} from '../util/grapql';

function Home() {
    // HERE

    const {user} = useContext(AuthContext);

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
                { 
                    user && (
                    <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                    )
                }

                {loading ? (
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