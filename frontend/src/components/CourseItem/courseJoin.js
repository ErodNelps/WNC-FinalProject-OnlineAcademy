import React, {useState, useContext, useEffect,  useMemo} from "react";
import {useHistory} from 'react-router-dom'
import {useDropzone} from 'react-dropzone';
import 'react-quill/dist/quill.snow.css';
import userContext from "../App/context/userContext";
import './style.css'
import Axios from "axios";
import { Divider, Collection, CollectionItem } from "react-materialize";   
import {Col, Row} from 'react-bootstrap';
import 'materialize-css'
import ReactPlayer from 'react-player'
import {connect } from 'react-redux'
import store from '../../redux/store'
import {fetchCourseSeleccted, fetchSyllabus} from '../../redux/course'

const CourseJoin = ({courseSelected = {}, syllabus = []})=> {
    const {userData} = useContext(userContext);
    let history = useHistory();
    let id = history.location.pathname.replace('/join/','');
    useEffect(() =>{
        store.dispatch(fetchCourseSeleccted(id))
        if(userData.user) {
            store.dispatch(fetchSyllabus(id))
        }
    },[])
    const children = [];

    const [vidID, setVID] = useState(null);
    const fetchMedia = (id) => {
        setVID(id);
    }


    // for (var i = 0; i < numVideo; i += 1) {
    //     children.push(<TextInput id={i} type="file" label={`Chapter ${i + 2}`}/>);
    // };

    // const onAddChild = () => {
    //     setNumVideo(numVideo + 1)
    // }

    return (
        <div className="edit-container">
            <Row>
            <Row className="label" style={{marginLeft: "10px", marginRight:"auto"}}><h4>{courseSelected.title}</h4></Row>
            <Col>
                <Row>
                    <Col>
                        <Collection className="file-list">
                        {syllabus ? <>{syllabus.map((vid) => (
                        <CollectionItem onClick={() => fetchMedia(vid.id)} key={vid.id}>{vid.name} </CollectionItem>
                        ))}</> : <></>}
                        </Collection>
                    </Col>
                </Row>
                    {vidID ? <ReactPlayer url={"http://localhost:8080/media/vid/" + vidID} controls={true}></ReactPlayer> : <></>}
                    <Divider/>
                </Col>
            </Row>
            
            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add new video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="edit-button">
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </div>
    )
}
  
const mapStateToProps = state =>{
    const courseSelected = state.courseReducer.courseSelected;
    const syllabus = state.courseReducer.syllabus;

    return {courseSelected, syllabus}
};

export default connect (mapStateToProps)(CourseJoin)
