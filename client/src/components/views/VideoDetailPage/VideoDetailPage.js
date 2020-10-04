import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Axios from 'axios';
import Comment from './Sections/Comment';

function DetailVideoPage(props) {

    const videoId = props.match.params.videoId
    const [VideoDetail, setVideoDetail] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const Variable = {
        videoId: videoId
    }

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', Variable)
            .then(response => {
                if (response.data.success) {
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert('비디오 정보를 가져오길 실패했습니다.')
                }
            })

        Axios.post('/api/comment/getComments', Variable)
            .then(response => {
                if (response.data.success) {
                    setCommentLists(response.data.comments)
                } else {
                    alert('댓글 정보를 가져오는 것을 실패했습니다.')
                }
            })
    }, [])

    const refreshFunction = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }


    if (VideoDetail.writer) {

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>

        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

                        <List.Item
                            actions={[subscribeButton]}  
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                            <div></div>
                        </List.Item>

                            <Comment commentLists={CommentLists} postId={videoId} refreshFunction={refreshFunction} /> 
                        
                    </div>
                </Col>
                <Col lg={6} xs={24}>

                    <SideVideo />

                </Col>
            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default DetailVideoPage

