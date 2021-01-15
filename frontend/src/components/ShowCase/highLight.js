import React, { useEffect, useState } from 'react';
import 'materialize-css'
import CourseCarousel from '../Carousel'
import { Preloader } from 'react-materialize';
import './style.css';
import {connect} from 'react-redux'
import {fetchHighLight} from '../../redux/course'
import store from '../../redux/store'

const HighLightWeek = ({highLight = []}) => {
    const [isLoading, setLoading] =useState(true)
    useEffect(_ =>{
        store.dispatch(fetchHighLight());
        setLoading(false)
    }, []);

    return(
        <div> 
            {isLoading ? <Preloader /> : 
                (<> <CourseCarousel collection={highLight}>
                  </CourseCarousel></>)}
        </div>
    )
}

const mapStateToProps = state => {
    const highLight =  state.courseReducer.weekHighlight;
    return {
        highLight
    }
}

export default connect(mapStateToProps)(HighLightWeek)