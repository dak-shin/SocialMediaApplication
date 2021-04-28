import React, {useState} from 'react'
import {gql, useMutation} from '@apollo/client';
import {Button,Confirm, Icon} from 'semantic-ui-react';

function DeleteButton({postId, callBack}) {

    const [openConfirm, setOpenConfirm] = useState(false);

    const [deletPost] = useMutation(DELETE_POST_MUTATION, {
        update(_,result){
            setOpenConfirm(false);
            if(callBack) callBack();
            window.location.reload(false); 

        }
        ,variables:{
            postId
        }
    })


    return (
        <>
            <Button as="div" color="red" floated="right" onClick={() => {setOpenConfirm(true)}}>
                <Icon name="trash" style={{ margin: 0}}/>
            </Button>
            <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={deletPost}
            cancelButton='Cancel'
            confirmButton="Yes I'm sure"
            content="Are you sure you want to delete this post ?"
            />
        </>
    )
}

const DELETE_POST_MUTATION = gql`

    mutation deletPost(
        $postId : ID!
    ){
        deletePost(
            postId: $postId
        )
    }
`;

export default DeleteButton
