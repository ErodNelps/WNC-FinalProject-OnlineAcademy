import React, {useState, useContext, useEffect,  useMemo} from "react";
import {useHistory} from 'react-router-dom'
import {useDropzone} from 'react-dropzone';
import 'react-quill/dist/quill.snow.css';
import userContext from "../App/context/userContext";
import './style.css'
import Axios from "axios";
import { ProgressBar, Divider, Modal, Button, CollectionItem, Collection } from "react-materialize";   
import {Col, Row} from 'react-bootstrap';
import 'materialize-css'
import ReactPlayer from 'react-player'
import {connect } from 'react-redux'
import store from '../../redux/store'
import {fetchCourseSeleccted, fetchSyllabus} from '../../redux/course'

const AddNewChapter = ({courseSelected = {}, syllabus = []})=> {
    const {userData} = useContext(userContext);
    const [uploading, setuploading] = useState(false);
    const [name, setName] = useState('');
    let history = useHistory();
    let id = history.location.pathname.replace('/addchapter/','');
    useEffect(() =>{
        store.dispatch(fetchCourseSeleccted(id))
        if(userData.user) {
            store.dispatch(fetchSyllabus(id))
        }
    },[])

    useEffect(() =>{
        if(userData.user) {
            store.dispatch(fetchSyllabus(id))
        }
    },[syllabus])
    const children = [];

    const [vidID, setVID] = useState(null);
    const fetchMedia = (id) => {
        setVID(id);
    }

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({accept: 'video/*', enctype: "multipart/form-data", name: "chapter"});
    
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
        }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {Math.ceil(file.size/1024)} KB
        </li>
      ));

    // for (var i = 0; i < numVideo; i += 1) {
    //     children.push(<TextInput id={i} type="file" label={`Chapter ${i + 2}`}/>);
    // };

    // const onAddChild = () => {
    //     setNumVideo(numVideo + 1)
    // }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(!userData.user){
            return
        }
        
        try {
            if(name === ""){
                alert("Please enter a name!")
                return
            } else {
                setuploading(true);
                const data = new FormData()
                acceptedFiles.forEach(file => {
                    data.append("chapter", file)
                    data.append("name", name)
                })

                Axios.post("http://localhost:8080/courses/add-chapter/upload/" + id, data).then((res =>{
                    setuploading(false)
                    alert("Chapter added")
                }))
                store.dispatch(fetchCourseSeleccted(id))
                store.dispatch(fetchSyllabus(id))
            }
        } catch (err) {
            alert(err)
            setuploading(false)
        }
        
    }

    return (
        <div className="edit-container">
            <Row>
                <Row className="label" style={{marginLeft: "10px", marginRight:"auto"}}><h4>Edit course</h4></Row>
                <Col xs={6}>
                    {/* <Button variant="primary" onClick={handleShow}>Add new video</Button> */}
                    <Modal actions={[<Button flat modal="close" node="button" waves="green">Close</Button>]}
                        bottomSheet={false}
                        fixedFooter={false}
                        header="Modal Header"
                        id="Modal-0"
                        open={false}
                        options={{
                            dismissible: true,
                            endingTop: '10%',
                            inDuration: 250,
                            onCloseEnd: null,
                            onCloseStart: null,
                            onOpenEnd: null,
                            onOpenStart: null,
                            opacity: 0.5,
                            outDuration: 250,
                            preventScrolling: true,
                            startingTop: '4%'
                        }}
                        trigger={<Button node="button" style={{marginLeft: "10px", marginRight:"auto"}}>Add new chapter</Button>}
                        >
                            <input type="text" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)}></input>
                        <section className="container">
                            <div {...getRootProps({style})}>
                                <input {...getInputProps()} />
                                <p>Drag & drop your videos here, or click to select files</p>
                            </div>
                            <aside>
                                <h5>Accepted videos</h5>
                                <ul >{acceptedFileItems}</ul>
                            </aside>
                            {uploading? <ProgressBar />: <></>}
                            <Button block size={"lg"} onClick={(e) => handleSubmit(e)}>
                                Upload
                            </Button>
                        </section>
                    </Modal>
                </Col>
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

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#1f1f1f',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  
  
const mapStateToProps = state =>{
    const courseSelected = state.courseReducer.courseSelected;
    const syllabus = state.courseReducer.syllabus;

    return {courseSelected, syllabus}
};

export default connect (mapStateToProps)(AddNewChapter)
