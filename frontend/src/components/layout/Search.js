import React, { useEffect, useState } from 'react';
import 'materialize-css'
import { Row, Preloader } from 'react-materialize';
import CourseItem from '../CourseItem';
import './style.css';
import {connect } from 'react-redux'
import store from '../../redux/store'
import { fetchSearchResults } from '../../redux/course';
const Search = ({searchResult = []})=> {
    
    useEffect(() => {
       store.dispatch(fetchSearchResults())
    }, []);

    return(
        <div>
            {searchResult ? <Preloader /> : 
                (<>
                    <ul>
                        {searchResult.map((course) => (
                            <CourseItem key={course._id} course={course}></CourseItem>
                            ))}
                    </ul></>)}
        </div>
    )
}

const mapStateToProps = state => {
    const searchResult = state.courseReducer.searchResult;
    return {
        searchResult
    }
}

export default connect(mapStateToProps)(Search)