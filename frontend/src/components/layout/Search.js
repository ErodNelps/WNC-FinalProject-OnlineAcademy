import React, { useEffect, useState } from 'react';
import 'materialize-css'
import { Row, Preloader } from 'react-materialize';
import CourseItem from '../CourseItem';
import './style.css';
import {connect } from 'react-redux'
import store from '../../redux/store'
import { fetchSearchResults } from '../../redux/course';
export default function Search () {
    const [searchResult, setResult] = useState([]);
    const [query, setQuery] = useState('');

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