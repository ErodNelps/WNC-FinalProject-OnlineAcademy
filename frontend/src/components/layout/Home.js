import React, { } from 'react'
import MostViewed from "../ShowCase/mostViewed";
import HighLightWeek from "../ShowCase/highLight"
import LatestCourse from "../ShowCase/latest"
import './style.css'

export default function Home(){
    return(
        <React.Fragment>
            <div className="pageMargin">
                <p className="label">Highlight</p>
                <HighLightWeek></HighLightWeek>
                <p className="label">Most viewed</p>
                <MostViewed></MostViewed>
                <p className="label">Latest courses</p>
                <LatestCourse></LatestCourse>
            </div>
        </React.Fragment>
    )
}