import React from 'react'
import 'materialize-css'
import {Tab, Tabs, Button} from 'react-materialize'
import { Link } from 'react-router-dom'

export default function LecturerCourse(){
    const handleAddCourse = () =>{

    }

    return(
        <>
        <Link to="/addnewcourse">
            <Button onclick={handleAddCourse}>Post new course</Button>
        </Link>
        <Tabs className="tabs z-depth-1">
            <Tab className="tab"
                options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
                }}
                title="Đăng kí">
                Khóa học của tôi
            </Tab>
            <Tab className="tab"
                active
                options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
                }}
                title="Watchlist">
                Watchlist
            </Tab>
        </Tabs>
        </>
    )    
}