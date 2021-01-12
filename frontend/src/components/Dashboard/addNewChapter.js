import React, {useState, useContext, useEffect, useRef} from "react";
import Button from 'react-bootstrap/Button'
import 'react-quill/dist/quill.snow.css';
import userContext from "../App/context/userContext";
import {TextInput} from "react-materialize";
import './style.css'
import {Form} from "react-bootstrap";
import Axios from "axios";
export default function AddNewChapter(){
    const {userData} = useContext(userContext);
    const [createdAt, setCreatedAt] = useState('');
    const [numVideo, setNumVideo] = useState(0);
    const children = [];
    useEffect(() => {
        setCreatedAt(getCurrentDate());
    })

    const c1Ref = useRef(null);

    for (var i = 0; i < numVideo; i += 1) {
        children.push(<TextInput id={i} type="file" label={`Chapter ${i + 2}`}/>);
    };

    const onAddChild = () => {
        setNumVideo(numVideo + 1)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try {
            const data = new FormData()
            data.append("chap_1", c1Ref.current.files[0])
            await Axios.post("http://localhost:8080/courses/testFile", data).then((res =>{
                
            }))
            // await Axios.post(
            //     "http://localhost:8080/users/add-new-course",
            //     newCourse
            // ).then((res) => {
            //     alert("New course posted successfully!")
            // });

        } catch (err) {
            alert(err)
            // alert(err.response.data.msg);
        }
    }

    const getCurrentDate = () => {
        var today = new Date();
        return today.toLocaleString()
    }

    return (
        <div className="Login">
            {/*<TextInput id="1" ref={(ref) => c1Ref.current = ref} label="1" type="file" label="Chapter 1:"/>*/}
            <input id={"1"} type={"file"} ref={c1Ref}/>
            {children}
            <Button block size="lg" onClick={onAddChild} style={{marginTop:"10px"}}>
                Add Chapter
            </Button>
            <Button block size={"lg"} onClick={(e) => handleSubmit(e)}>
                Submit
            </Button>
        </div>
    )
}