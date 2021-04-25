import React from 'react'
import {Card, Icon, Label, Image, Button} from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const PostCard = (props)=> {

    const { id,
            body,
            timeAt,
            username,
            likesCount,
            commentsCount,
            likes,
            comments} = props.props;

    // console.log(props.post);

    return (
    //Options number 1 

    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>

        <Card.Meta >{moment(timeAt).fromNow()}</Card.Meta>

        <Card.Description>{body}</Card.Description>

      </Card.Content>
      <Card.Content extra>
        <Button as='div'  labelPosition='right'>
            <Button color='black' basic>
                <Icon name='heart' />
                
            </Button>
            <Label as='a' basic color='black' pointing='left'>
                {likesCount}
            </Label>
        </Button>
        <Button as='div'  labelPosition='right'>
            <Button color='black' basic>
                <Icon name='comment' />
                
            </Button>
            <Label as='a' basic color='black' pointing='left'>
                {commentsCount}
            </Label>
        </Button>
      </Card.Content>
    </Card>

    //Option number 2 

    // <Card>
    // <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    //     <Card.Content>
    //   <Card.Header>{username}</Card.Header>
    //   <Card.Meta>
    //     <span className='date'>{moment(timeAt).fromNow()}</span>
    //   </Card.Meta>
    //   <Card.Description>
    //       {body}
    //   </Card.Description>
    // </Card.Content>
    // <Card.Content extra>
    //   Buttons here
    // </Card.Content>
    // </Card>

    )
}

export default PostCard
