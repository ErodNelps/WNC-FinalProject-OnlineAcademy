import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import UserContext from "../App/context/userContext";
import Axios from "axios";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

export default function AddNewCourse(){
    const [title, setTitle] = useState();
    const [briefDes, setBriefDes] = useState();
    const [fullDes, setFullDes] = useState()
    const [price, setPrice] = useState();
    const [bonus, setBonus] = useState();

    
    const handleSubmit = () =>{
        
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
                    onChange={(e) => setTitle(e.target.value)}
                    />
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
                
                <Button block size="lg" type="submit" style={{marginTop:"10px"}}>
                    Register
                </Button>
            </Form>
        </div>
    )
}