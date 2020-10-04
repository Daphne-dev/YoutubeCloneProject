import React, { useState } from 'react'
import { Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';


const { TextArea } = Input;

function Comment(props) {
    const user = useSelector(state => state.user)
    const [CommentValue, setCommentValue] = useState("")

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('댓글을 저장하지 못했습니다.')
                }
            })
    }

    return (
        <div>
            <br />
            <p>댓글</p>
            <hr />
            {/* Comment Lists  */}
            {props.commentLists && props.commentLists.map((comment, index) => (
                <div key={index}>
                {!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment commentLists={props.commentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                }
                </div>
            ))}

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea 
                    style={{ width: '100%', borderRadius: '5px', resize:"none"  }}
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="댓글을 작성해주세요."
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>댓글</Button>
            </form>

        </div>
    )
}

export default Comment
