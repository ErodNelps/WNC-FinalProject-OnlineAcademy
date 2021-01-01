import React, { useContext } from 'react'
import 'materialize-css'
import { Divider} from 'react-materialize'

import './style.css'
import UserProfile from './UserProfile'
import StudentCourse from './studentCourse'
import userContext from '../App/context/userContext'
import LecturerCourse from './lecturerCourse'

export default function Dashboard(){
    const {userData} = useContext(userContext)
    return(
        <div className="course-detail">
            {userData.user ? <><UserProfile/>
            <Divider/>
            {userData.user.role=='student' ? <StudentCourse></StudentCourse> :
            userData.user.role == 'lecturer' ? <LecturerCourse></LecturerCourse> : <></>}</> :  
            <h2>You are not logged in</h2>}
        </div>
    )
}