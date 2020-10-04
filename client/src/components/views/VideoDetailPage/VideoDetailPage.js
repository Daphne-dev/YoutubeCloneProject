import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Axios from 'axios';


function DetailVideoPage(props) {

    const videoId = props.match.params.videoId
    const [VideoDetail, setVideoDetail] = useState([])

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
    }, [])

    if (VideoDetail.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

                        <List.Item
                            actions={[<Subscribe userTo={VideoDetail.writer._id}/>]}
                            
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                            <div></div>
                        </List.Item>

                            {/* Comments */}
                        
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

