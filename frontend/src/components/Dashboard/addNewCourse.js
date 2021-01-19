import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Axios from "axios";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import userContext from "../App/context/userContext";
import Dropdown from 'react-multilevel-dropdown'

export default function AddNewCourse(){
    const {userData} = useContext(userContext);
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [briefDes, setBriefDes] = useState('');
    const [fullDes, setFullDes] = useState({htmlString: ''});
    const [price, setPrice] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [createdAt, setCreatedAt] = useState('');
    const [numVideo, setNumVideo] = useState(0);
    const [subCategories, setSubcCategory] = useState([]);
    const [catLabel, setCatLabel] =useState("Choose category")
    const [subcat, setSubCat] = useState();
    const [cat, setCat] = useState();
    const thumbnailRef = useRef(null);
    useEffect(() => {
        setCreatedAt(getCurrentDate());
        fetchAllSubCategory();
    }, [])


    const fetchAllSubCategory = async () => {
        const subRes = await Axios.get("http://localhost:8080/subcategory/get-all-subcategory");
            let subcategories = []
            for(var i in subRes.data){
                var data = subRes.data[i];
                subcategories.push({_id: data._id, catID: data.catID, name: data.name});
            }
            setSubcCategory(subcategories)
        }   
    const onAddChild = () => {
        setNumVideo(numVideo + 1)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const thumbnail = new FormData()
            thumbnail.append("thumbnail", thumbnailRef.current.files[0])
            const newCourse =  { title, briefDes, fullDes : fullDes.htmlString, price, bonus, createdAt, cat: cat, subcat: subcat };
            await Axios.post( "http://localhost:8080/courses/upload-image", thumbnail).then(()=>{ Axios.post(
              "http://localhost:8080/courses/add-new-course/" + userData.user.id,
              newCourse
            ).then((res) => {
                alert("New course posted successfully!")
                history.push("/dashboard")
            })
        });
            
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    const handleCatChoose = (e, id, catID, name) => {
        e.preventDefault();
        setCatLabel(name);
        setSubCat(id)
        setCat(catID)
    }
    const getCurrentDate = () => {
        var today = Date.now();
        return today;
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
                    <Form.File type="file" id="thumnail" label="Thumbnail" ref={thumbnailRef} />
                </Form.Group>
                <Form.Group size="lg" controlId="briefDes">
                    <Form.Label>Brief description</Form.Label>
                    <Form.Control
                    type="text"
                    value={briefDes}
                    onChange={(e) => setBriefDes(e.target.value)}
                    />
                </Form.Group>
                <ReactQuill theme="snow" value={fullDes.htmlString || ''} onChange={(value) => setFullDes({htmlString: value})}></ReactQuill>
                <Dropdown menuClassName="dropdown-menu-1" wrapperClassName="dropdown-wrapper-1" buttonClassName="dropdown-button-1" className="dropdown-1" title={catLabel}>
                    {subCategories ? <>{subCategories.map((subcategory, index) => (
                    <Dropdown.Item  key={index} name={subcategory.name} onClick={(e)=>handleCatChoose(e, subcategory._id, subcategory.catID, subcategory.name)}>{subcategory.name}</Dropdown.Item>
                    ))}</> : <></>}
                </Dropdown>
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
                    Post
                </Button>
            </Form>
        </div>
    )
}