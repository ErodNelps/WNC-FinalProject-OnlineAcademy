import React from 'react'
import 'materialize-css'
import { Row, Col, Divider} from 'react-materialize'

import './style.css'
import UserProfile from './UserProfile'
import StudentCourse from './studentCourse'

export default function Dashboard(){
    return(
        <div className="course-detail">
            <UserProfile/>
            <Divider/>
            <StudentCourse/>
        </div>
    )
}