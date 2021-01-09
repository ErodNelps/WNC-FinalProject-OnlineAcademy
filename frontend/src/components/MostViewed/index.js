import React, { useEffect, useState } from 'react';
import 'materialize-css'
import CourseCarousel from '../Carousel'
import { Row, Preloader } from 'react-materialize';
import CourseItem from '../CourseItem';
import './style.css';
import {connect} from 'react-redux'
import {fetchMostViewed} from '../../redux/course'
import store from '../../redux/store'

const MostViewed = ({mostViewed = [], isLoading}) => {
    useEffect(_ =>{
        store.dispatch(fetchMostViewed());
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
    const isLoading = state.courseReducer.isLoading;
    console.log(state.courseReducer.mostViewed)
    return {
        mostViewed, isLoading
    }
}

export default connect(mapStateToProps)(MostViewed)