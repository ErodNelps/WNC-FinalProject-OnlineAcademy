import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import UserContext from "../App/context/userContext";
import Axios from "axios";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import userContext from "../App/context/userContext";

export default function AddNewCourse(){
    const {userData} = useContext(userContext);
    const [title, setTitle] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [briefDes, setBriefDes] = useState();
    const [fullDes, setFullDes] = useState();
    const [price, setPrice] = useState();
    const [bonus, setBonus] = useState();
    const [syllabus, setSyllabus] = useState([]);
    const [createdAt, setCreatedAt] = useState('');
    const [numVideo, setNumVideo] = useState(0);

    const children = [];
    useEffect(() => {
        setCreatedAt(getCurrentDate());
    })

    for (var i = 0; i < numVideo; i += 1) {
      children.push(<Form.Group size="lg" controlId="syllabus" key={i} name={i}>
      <Form.Label>Chapter{i + 2}</Form.Label>
      <Form.Control
      type="text"
      onChange={(e) => setSyllabus([...syllabus, e.target.value])}/>
        </Form.Group>);
    };

    const onAddChild = () => {
        setNumVideo(numVideo + 1)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try {
            alert("Today is: "+ createdAt)
            const newCourse =  { thumbnail, title, briefDes, fullDes, price, bonus, syllabus, createdAt };
            await Axios.post(
              "http://localhost:8080/users/add-new-course",
              newCourse
            ).then((res) => {
                alert("New course posted successfully!")
            });
            
          } catch (err) {
            alert(err.response.data.msg);
        }
    }

    const getCurrentDate = () => {
        var today = new Date();
        return today.toLocaleString()
    }
    return (
        <div className="Login">
            
            <Form onSubmit={handleSubmit}>
                <p className="label">Add a new course</p>
                <Form.Group size="lg" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                    autoFocus
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.File type="file" id="thumnail" label="Thumbnail" onChange={(e) => setThumbnail({file: e.target.files})} />
                </Form.Group>
                <Form.Group size="lg" controlId="briefDes">
                    <Form.Label>Brief description</Form.Label>
                    <Form.Control
                    type="text"
                    value={briefDes}
                    onChange={(e) => setBriefDes(e.target.value)}
                    />
                </Form.Group>
                <ReactQuill theme="snow" value={fullDes || ''} onchange={setFullDes}></ReactQuill>
                <Form.Group size="lg" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="bonus">
                    <Form.Label>Bonus</Form.Label>
                    <Form.Control
                    type="text"
                    value={bonus}
                    onChange={(e) => setBonus(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="syllabus">
                    <Form.Label>Course syllabus - </Form.Label>
                    <Form.Label>Chapter 1</Form.Label>
                    <Form.Control
                    type="text"
                    onChange={(e) => setSyllabus([...syllabus, e.target.value])}/>
                </Form.Group>
                {children}
                <Button block size="lg" onClick={test} style={{marginTop:"10px"}}>
                    Add Chapter
                </Button>
                <Button block size="lg" type="submit" style={{marginTop:"10px"}}>
                    Post
                </Button>
            </Form>
        </div>
    )
}