import React, { useEffect, useState } from 'react';
import 'materialize-css'
import { Row, Preloader } from 'react-materialize';
import CourseItem from '../CourseItem';
import Axios from 'axios';
import './style.css';

export default function MostViewed (){
    const [mostViewed, setMostViewed] = useState([]);
    const [arrayLength, setLength] = useState();
    const [halfLength, sethalfLength] = useState();
    const [loading, setLoading] = useState(true);
    const initialList = [];

    useEffect(() => {
        //setTimeout(() => {
            async function fetchItems() {
                try {
                    const res = await Axios.get("http://localhost:8080/courses/most-viewed");
                    console.log(res.data);
                    setLoading(false);
                    setMostViewed(res.data);
                    setLength(mostViewed.length);
                    sethalfLength(Math.ceil(arrayLength/2));
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
                (<><Row>
                    <ul>
                        {mostViewed.splice(0,halfLength).map((course) => (
                            <CourseItem key={course._id} course={course}></CourseItem>
                            ))}
                    </ul>
                </Row>
                <Row>
                    <ul>
                        {mostViewed.splice(halfLength, arrayLength).map((course) => (
                            <CourseItem key={course._id} props={course}></CourseItem>))}
                    </ul>
                </Row></>)}
        </div>
    )
}