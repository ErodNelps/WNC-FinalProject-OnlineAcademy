import React from 'react';
import { Carousel } from 'react-materialize';
import 'materialize-css'
import HighlightItem from '../CourseItem/highlightItem';

export default function CourseCarousel () {
    const handleClick = _ => {
        console.log("clicked 1")
    }


    return (
        <Carousel
            carouselId="Carousel-2"
            className="white-text center"
            options={{
                fullWidth: true,
                indicators: true
            }}
            >
            <div onClick={handleClick} style={{ cursor: 'pointer'}}>
                <HighlightItem/>
            </div>
            <div>
                <HighlightItem/>
            </div>
            <div>
                <HighlightItem/>
            </div>
            <div>
                <HighlightItem/>
            </div>
        </Carousel> 
    );
};



