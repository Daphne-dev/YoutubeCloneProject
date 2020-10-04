import React, {useState} from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';


const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    {value:0, label: "비공개" },
    {value:1, label: "공개"}
]

const CategoryOptions = [
    {value:0, label: "영화 & 애니메이션"},
    {value:1, label: "IT"},
    {value:2, label: "음악"},
    {value:3, label: "애완동물"},
]


function VideoUploadPage(props) {

    const user = useSelector(state => state.user);
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("영화 & 애니메이션")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDecriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom:'2rem' }}>
                <Title levle={2}>Upload Video</Title>
            </div>
            <Form onSubmit>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <Dropzone
                    onDrop
                    multiple
                    maxSize
                    >
                    {({ getRootProps, getInputProps}) => (
                        <div style={{ width: '300px', height: '240px', border:'1px solid lightgray', display:'flex', 
                        alignItems:'center', justifyContent:'center' }} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize:'3rem' }}/>

                        </div>
                    )}
                    </Dropzone>
                    {/* Thumbnail */}
                    
                </div>

            <br />
            <br />
            <label>Title</label>
            <Input 
                onChange={onTitleChange}
                value={VideoTitle}
            />
            <br />
            <br />
            <label>Description</label>
            <TextArea style={{ resize:"none" }}
                onChange={onDecriptionChange}
                value={Description}
            />
            <br />
            <br />

            <select onChange={onPrivateChange}>
                {PrivateOptions.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>

            <br />
            <br />
            <select onChange={onCategoryChange}>
                {CategoryOptions.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
            <br />
            <br />
            <Button type="primary" size="large" onClick>
                Submit
            </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage