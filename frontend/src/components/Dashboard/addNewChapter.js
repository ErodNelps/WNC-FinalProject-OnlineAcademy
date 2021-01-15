import React, {useState, useContext, useEffect, useRef, useMemo} from "react";
import {useDropzone} from 'react-dropzone';
import Button from 'react-bootstrap/Button'
import 'react-quill/dist/quill.snow.css';
import userContext from "../App/context/userContext";
import './style.css'
import Axios from "axios";
import { ProgressBar } from "react-materialize";
import 'materialize-css'

export default function AddNewChapter(){
    const {userData} = useContext(userContext);
    const [uploading, setuploading] = useState(false)
    const children = [];
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
    useEffect(() => {
    })

    const chapterRef = useRef(null);

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
        setuploading(true)
        try {
            const data = new FormData()

            acceptedFiles.forEach(file => {
                data.append("chapter", file)
            })

            Axios.post("http://localhost:8080/courses/add-chapter/upload", data).then((res =>{
                setuploading(false)
                alert("Chapter added")
            }))

        } catch (err) {
            alert(err)
            setuploading(false)
        }
        
    }

    return (
        <section className="container">
            {/* {children} */}
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Drag & drop your videos here, or click to select files</p>
            </div>
            <aside>
                <h5>Accepted videos</h5>
                <ul>{acceptedFileItems}</ul>
            </aside>
            {uploading? <ProgressBar />: <></>}
            <Button block size={"lg"} onClick={(e) => handleSubmit(e)}>
                Upload
            </Button>
        </section>
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
    color: '#bdbdbd',
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
  