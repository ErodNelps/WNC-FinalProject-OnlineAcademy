import React, { useEffect, useState } from 'react';
import 'materialize-css'
import CourseCarousel from '../Carousel'
import { Preloader } from 'react-materialize';
import './style.css';
import {connect} from 'react-redux'
import {fetchMostViewed} from '../../redux/course'
import store from '../../redux/store'

const MostViewed = ({mostViewed = []}) => {
    const [isLoading, setLoading] =useState(true)
    useEffect(_ =>{
        store.dispatch(fetchMostViewed());
        setLoading(false)
    }, []);

    return(
        <div> 
            {isLoading ? <Preloader /> : 
                (<> <CourseCarousel collection={mostViewed}>
                  </CourseCarousel></>)}
        </div>
    )
}

const mapStateToProps = state => {
    const mostViewed =  state.courseReducer.mostViewed;
    return {
        mostViewed
    }
}

export default connect(mapStateToProps)(MostViewed)