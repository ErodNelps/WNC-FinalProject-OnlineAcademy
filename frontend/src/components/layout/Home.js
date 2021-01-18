import React, { } from 'react'
import MostViewed from "../ShowCase/mostViewed";
import HighLightWeek from "../ShowCase/highLight"
import LatestCourse from "../ShowCase/latest"
import './style.css'

export default function Home(){
    return(
        <React.Fragment>
            <div className="pageMargin">
                <p className="label-home">Highlight</p>
                <HighLightWeek></HighLightWeek>
                <p className="label-home">Most viewed</p>
                <MostViewed></MostViewed>
                <p className="label-home">Latest courses</p>
                <LatestCourse></LatestCourse>
            </div>
        </React.Fragment>
    )
}