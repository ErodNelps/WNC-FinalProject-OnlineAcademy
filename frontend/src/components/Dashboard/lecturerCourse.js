import React, {useContext, useEffect} from 'react'
import 'materialize-css'
import {Tab, Tabs, Button, Table} from 'react-materialize'
import { Link } from 'react-router-dom'
import {fetchLecturerCourse} from '../../redux/user'
import {connect } from 'react-redux'
import store from '../../redux/store'
import userContext from '../App/context/userContext'

const LecturerCourse = ({lecturerCourse = []}) =>{
    const { userData } = useContext(userContext);

    useEffect(() => {
        store.dispatch(fetchLecturerCourse(userData.user.id))
    },[]);
    const handleAddCourse = () =>{

    }

    return(
        <>
        
        <Tabs className="tabs z-depth-1">
        <Tab className="tab" active
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="My course">
                    <Table>
                        <thead>
                            <tr>
                                <th data-field="id">
                                    Name
                                </th>
                                <th data-field="name">
                                    Subcription count
                                </th>
                                <th data-field="status">
                                    Status
                                </th>
                                <th data-field="price">
                                <Link to="/addnewcourse">
                                    <Button onClick={handleAddCourse}>Post new course</Button>
                                </Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {lecturerCourse ? 
                            (<>{lecturerCourse.map((course, index) => (<tr key={index}>
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
                                <Link to={"/addchapter/" + course._id}><Button style={{marginRight: "10px"}}><i className="fa fa-pencil" aria-hidden="true"></i></Button></Link>
                                   <Button style={{marginRight: "10px"}}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                                </td>
                            </tr>))}</>) : <></>}
                        </tbody>
                    </Table>
                </Tab>
        </Tabs>
        </>
    )    
}

const mapStateToProps = state => {
    const lecturerCourse = state.userReducer.lecturerCourse;
    return {
         lecturerCourse
    }
}

export default connect(mapStateToProps)(LecturerCourse)