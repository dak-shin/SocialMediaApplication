import React,{useContext, useEffect} from 'react'
import {gql, useQuery} from '@apollo/client';
import { Dimmer, Loader, Image, Segment, Grid, Card, Button, Label, Icon } from 'semantic-ui-react'
import moment from 'moment';
import Linkify from 'react-linkify';
import {browserHistory} from 'react-router';

import {AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {

    const postId = props.match.params.postId;
    console.log(postId);

        const {loading, data} = useQuery(FETCH_POST_QUERY,{
        variables:{
            postId
        }
    })
    let postMarkup;
    const deletePostCB = () => {
        props.history.push('/');
    }

    const {user } = useContext(AuthContext);

    if(!data){
        postMarkup = <Segment>
            <Dimmer active inverted>
                <Loader inverted content='Loading' />
            </Dimmer>

            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>
    }else{
        const {id, username, body, likes, comments, likesCount, commentsCount, timeAt} = data.getPost

        postMarkup = (<Grid>
            <Grid.Row fluid style={{marginTop: "2rem"}}>
                <Grid.Column width={2}>
                <Image
                    floated='right'
                    size='small'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                    />
                </Grid.Column>
                <Grid.Column width={10}>

                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta >{moment(timeAt).fromNow()}</Card.Meta>
                            <Linkify>
                            <Card.Description>{body}</Card.Description>
                            </Linkify>

                        </Card.Content>
                        <hr/>
                        <Card.Content extra>
                            <LikeButton user={user} post={{id,likes,likesCount}}/>

                            <Button   labelPosition='right' as="div" onClick={() => console.log('Comment')}>
                                <Button color='black' basic>
                                    <Icon name='comment' />
                                </Button>
                                <Label as='a' basic color='black' pointing='left'>
                                    {commentsCount}

                                </Label>
                            </Button>
                            {user && user.username === username && <DeleteButton postId={postId} callBack={deletePostCB}/>}
                        </Card.Content>


                    </Card>

                </Grid.Column>
            </Grid.Row>
        </Grid>)
        
    }

    return postMarkup;
}

const FETCH_POST_QUERY = gql`

    query(
        $postId: ID!
    ){
        getPost(postId: $postId){
            id
            body
            timeAt
            username
            likes{
                username
            }
            comments{
                id
                username
                body
                timeAt
            }
            commentsCount
            likesCount
        }
    }
`;

export default SinglePost
