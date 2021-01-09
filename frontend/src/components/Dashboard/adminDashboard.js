import React, { useContext } from 'react'
import 'materialize-css'
import { Tabs, Tab, Table, Button } from 'react-materialize'

import './style.css'
import userContext from '../App/context/userContext'

export default function AdminDashboard(){
    const {userData} = useContext(userContext)
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
                                    Eclair
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
                                    Item Name
                                </th>
                                <th data-field="price">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Jonathan
                                </td>
                                <td>
                                    Lollipop
                                </td>
                                <td>
                                   <Button style={{marginRight: "10px"}}><i class="fa fa-trash" aria-hidden="true"></i></Button>
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
                                    Email
                                </th>
                                <th data-field="role">
                                    Role
                                </th>
                                <th>
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Jonathan
                                </td>
                                <td>
                                    Lollipop
                                </td>
                                <td>
                                    Lecturer
                                </td>
                                <td>
                                   <Button style={{marginRight: "10px"}}><i class="fa fa-plus" aria-hidden="true"></i></Button>
                                   <Button style={{marginRight: "10px"}}><i class="fa fa-trash" aria-hidden="true"></i></Button>
                                   <Button style={{marginRight: "10px"}}><i class="fa fa-pencil" aria-hidden="true"></i></Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
    )
}