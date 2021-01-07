import React, { useEffect, useState } from 'react';
import 'materialize-css'
import { Row, Preloader } from 'react-materialize';
import CourseItem from '../CourseItem';
import Axios from 'axios';
import './style.css';

export default function Search (){
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //setTimeout(() => {
            async function fetchItems() {
                try {
                } catch(err){
                    throw new Error(`HTTP error! status: ` + err.message);
                }   
            }
            
            fetchItems();
            
        //}, 1000);
    }, []);

    return(
        <div>
            {loading ? <Preloader /> : 
                (<>
                    <ul>
                        {searchResult.map((course) => (
                            <CourseItem key={course._id} course={course}></CourseItem>
                            ))}
                    </ul></>)}
        </div>
    )
}