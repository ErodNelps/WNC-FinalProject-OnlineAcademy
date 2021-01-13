import React, { useContext, useEffect, useState } from 'react'
import 'materialize-css'
import {Tab, Tabs, Table, Button} from 'react-materialize'
import userContext from '../App/context/userContext'
import {connect} from 'react-redux'
import {fetchStudentSubList, fetchStudentWatchlist} from '../../redux/user'
import store from '../../redux/store'
const StudentCourse = ({watchList=[], subList = []}) => {
    const { userData } = useContext(userContext);

    useEffect(() => {
        store.dispatch(fetchStudentWatchlist(userData.user.id))
        store.dispatch(fetchStudentSubList(userData.user.id))
    },[]);

    return(
        <Tabs className="tabs z-depth-1">
            <Tab className="tab" active
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Watchlist">
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
                        {watchList ? 
                            (<>{watchList.map((course, index) => (<tr key={index}>
                                <td>
                                    {course.title}
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
                    title="Subcription">
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
                        {subList ? 
                            (<>{subList.map((course, index) => (<tr key={index}>
                                <td>
                                    {course.title}
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
            
        </Tabs>
    )    
}

const mapStateToProps = state => {
    const watchList = state.userReducer.watchList;
    const subList = state.userReducer.subList;
    return {
        watchList, subList
    }
}

export default connect(mapStateToProps)(StudentCourse)