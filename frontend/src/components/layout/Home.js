import React, { useContext } from 'react'
import CourseCarousel from '../Carousel';
import MostViewed from "../MostViewed";
import './style.css'

export default function Home(){
    return(
        <React.Fragment>
            <div className="pageMargin">
                <p className="label">Nổi bật tuần qua</p>
                <CourseCarousel/>
                <p className="label">Được xem nhiều nhất tháng này</p>
                <MostViewed></MostViewed>
            </div>
        </React.Fragment>
    )
}