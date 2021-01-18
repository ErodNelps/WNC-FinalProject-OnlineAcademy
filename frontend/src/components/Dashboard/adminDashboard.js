import React, { useEffect, useState } from 'react'
import 'materialize-css'
import { Tabs, Tab, Table, Button, Modal } from 'react-materialize'
import { Link } from 'react-router-dom'
import './style.css'
import {fetchAllUser} from '../../redux/user'
import {fetchAllCourse} from '../../redux/course'
import {fetchAllCategory} from '../../redux/category'
import store from '../../redux/store'
import {connect} from 'react-redux'
import Axios from 'axios'

const AdminDashboard = ({users = [], courses = [], categories= []}) =>{
    const [catName, setCatName] = useState('')
    const [subcatName, setSubCatName] = useState('')
    useEffect(_ =>{
        store.dispatch(fetchAllUser());
        store.dispatch(fetchAllCourse());
        store.dispatch(fetchAllCategory());
    }, []);

    useEffect(_ =>{
        store.dispatch(fetchAllCategory());
    }, [categories]);

    const handleSubmitNewCat = (e) => {
        e.preventDefault();
        if(catName == ''){
            alert("Please enter a name!");
            return
        }
        if(catName.length < 2){
            alert('Name has to be at least 2 character longs')
            return
        }
        try{
            Axios.post("http://localhost:8080/category/add", {catName}).then(res =>{
                alert(catName + ' category has been added')
            }).catch((error) => {
                alert(error.response.data.msg)
            })
        } catch (err) {
            console.log(err);
        }
        
    }

    const handleSubmitNewSubCat = (e, catID) => {
        e.preventDefault();
        if(subcatName == ''){
            alert("Please enter a name!");
            return
        }
        if(subcatName.length < 2){
            alert('Name has to be at least 2 character longs')
            return
        }
        try{
            Axios.post("http://localhost:8080/subcategory/add", {subcatName, catID}).then(res =>{
                alert(subcatName + ' sub-category has been added')
            }).catch((error) => {
                alert(error.response.data.error)
            })
        } catch (err) {
            console.log(err);
        }     
    }

    const handleDeleteSubcat = (e, catID, name) =>{

    }

    const handleDeleteCat = (e, catID, catName) =>{
        e.preventDefault();
        try{
            Axios.delete("http://localhost:8080/category/delete/"+ catID).then(res =>{
                alert(catName + 'category has been delete')
            }).catch((error) => {
                alert(error.response.data.error)
            })
        } catch (err) {
            console.log(err);
        }
    }
    return(
            <Tabs className="tabs z-depth-1">
                <Tab active className="tab"
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Category">
                    <Table>
                        <thead>
                            <tr>
                                <th data-field="id">
                                    Category
                                </th>
                                <th data-field="name">
                                    Sub-categories
                                </th>
                                <th data-field="price">
                                <Modal actions={[<Button flat modal="close" node="button" waves="green">Close</Button>]}
                                                bottomSheet={false}
                                                fixedFooter={false}
                                                header="Add new category"
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
                                                trigger={<Button style={{marginRight: "10px"}}><i class="fa fa-plus" aria-hidden="true"></i></Button>}
                                                >
                                                    <input type="text" placeholder="Enter new category name..." value={catName} onChange={(e) => setCatName(e.target.value)}></input>
                                                    <Button block size={"lg"} onClick={(e) => handleSubmitNewCat(e)}>
                                                        Add
                                                    </Button>
                                            </Modal>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                                {categories? <>{categories.map((category, index) =>(
                                    <tr key={index}>
                                        <td>
                                            {category.category}
                                        </td>
                                        <td>
                                            {category.subCategories ? <>{category.subCategories.map((subcategory, index) => (
                                                <p>
                                                    {subcategory.name}
                                                </p>
                                            ))}</> : <></>}
                                        </td>
                                        <td>
                                            
                                            <Modal actions={[<Button flat modal="close" node="button" waves="green">Close</Button>]}
                                                bottomSheet={false}
                                                fixedFooter={false}
                                                header={"Add new sub-category for " + category.category}
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
                                                trigger={<Button style={{marginRight: "10px"}}><i class="fa fa-trash" aria-hidden="true"></i></Button>}
                                                >
                                                    <p>Do you want to delete {category.category}</p>
                                                    <Button block size={"lg"} onClick={(e) => handleDeleteCat(e, category._id, category.category)}>
                                                        Delete
                                                    </Button>
                                            </Modal>
                                            <Modal actions={[<Button flat modal="close" node="button" waves="green">Close</Button>]}
                                                bottomSheet={false}
                                                fixedFooter={false}
                                                header={"Add new sub-category for " + category.category}
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
                                                trigger={<Button style={{marginRight: "10px"}}><i class="fa fa-plus" aria-hidden="true"></i></Button>}
                                                >
                                                    <input type="text" placeholder="Enter new sub-category name..." value={subcatName} onChange={(e) => setSubCatName(e.target.value)}></input>
                                                    <Button block size={"lg"} onClick={(e) => handleSubmitNewSubCat(e, category._id)}>
                                                        Add
                                                    </Button>
                                            </Modal>
                                        </td>
                                    </tr>
                                ))}</> 
                                :<></>}
                        </tbody>
                    </Table>
                </Tab>
                <Tab className="tab"
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Course">
                    <Table>
                        <thead>
                            <tr>
                                <th data-field="id">
                                    Name
                                </th>
                                <th data-field="name">
                                    Subcription count
                                </th>
                                <th data-field="price">
                                    Status
                                </th>
                                <th data-field="price">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {courses ? 
                            (<>{courses.map((course, index) => (<tr key={index}>
                                <td>
                                    <Link key="1" to={"/course/"+ course._id}>{course.title}</Link>
                                </td>
                                <td>
                                    {course.subCount}
                                </td>
                                <td>
                                    {course.status}
                                </td>
                                <td>
                                   <Button style={{marginRight: "10px"}}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                                </td>
                            </tr>))}</>) : <></>}
                        </tbody>
                    </Table>
                </Tab>
                <Tab className="tab"
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="User">
                    <Table>
                        <thead>
                            <tr>
                                <th data-field="id">
                                    Name
                                </th>
                                <th data-field="name">
                                    Email
                                </th>
                                <th data-field="role">
                                    Role
                                </th>
                                <th>
                                <Link to="/addnewuser"><Button style={{marginRight: "10px"}}><i className="fa fa-plus" aria-hidden="true" ></i></Button></Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users ? 
                            (<>{users.map((user, index) => (<tr key={index}>
                                <td>
                                    {user.firstName} {user.lastName}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.role}
                                </td>
                                <td>
                                   <Button style={{marginRight: "10px"}}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                                   <Button style={{marginRight: "10px"}}><i className="fa fa-pencil" aria-hidden="true"></i></Button>
                                </td>
                            </tr>))}</>) : <></>}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
    )
}

const mapStateToProps = state => {
    const users = state.userReducer.users;
    const courses = state.courseReducer.courses;
    const categories =  state.categoryReducer.categories;
    return {
        users, courses, categories
    }
}

export default connect(mapStateToProps)(AdminDashboard)