import React, { useEffect } from 'react'
import 'materialize-css'
import { Tabs, Tab, Table, Button } from 'react-materialize'
import { Link } from 'react-router-dom'
import './style.css'
import {fetchAllUser} from '../../redux/user'
import {fetchAllCourse} from '../../redux/course'
import store from '../../redux/store'
import {connect} from 'react-redux'

const AdminDashboard = ({users = [], courses = [] }) =>{
    useEffect(_ =>{
        store.dispatch(fetchAllUser());
        store.dispatch(fetchAllCourse());
    }, []);

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
                                    Item Name
                                </th>
                                <th data-field="price">
                                    <Button style={{marginRight: "10px"}}><i class="fa fa-plus" aria-hidden="true"></i></Button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Category name
                                </td>
                                <td>
                                    Sub-cat
                                </td>
                                <td>
                                   
                                   <Button style={{marginRight: "10px"}}><i class="fa fa-trash" aria-hidden="true"></i></Button>
                                   <Button style={{marginRight: "10px"}}><i class="fa fa-pencil" aria-hidden="true"></i></Button>
                                </td>
                            </tr>
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
                                <a href="/addnewuser"><Button style={{marginRight: "10px"}}><i className="fa fa-plus" aria-hidden="true" ></i></Button></a>
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
    return {
        users, courses
    }
}

export default connect(mapStateToProps)(AdminDashboard)