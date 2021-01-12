import React, { useEffect, useState } from 'react';
import 'materialize-css'
import CourseCarousel from '../Carousel'
import { Preloader } from 'react-materialize';
import './style.css';
import {connect} from 'react-redux'
import {fetchLatest} from '../../redux/course'
import store from '../../redux/store'

const LatestCourse = ({latest = []}) => {
    const [isLoading, setLoading] =useState(true)
    useEffect(_ =>{
        store.dispatch(fetchLatest());
        setLoading(false)
    }, []);

    return(
        <div> 
            {isLoading ? <Preloader /> : 
                (<> <CourseCarousel collection={latest}>
                  </CourseCarousel></>)}
        </div>
    )
}

const mapStateToProps = state => {
    const latest =  state.courseReducer.latest;
    return {
        latest
    }
}

export default connect(mapStateToProps)(LatestCourse)