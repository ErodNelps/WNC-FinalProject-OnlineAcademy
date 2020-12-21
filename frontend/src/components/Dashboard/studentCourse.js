import React from 'react'
import 'materialize-css'
import {Tab, Tabs} from 'react-materialize'

export default function StudentCourse(){
    return(
        <Tabs className="tab-demo z-depth-1">
            <Tab
                options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
                }}
                title="Đăng kí">
                Đăng kí
            </Tab>
            <Tab
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
    )    
}