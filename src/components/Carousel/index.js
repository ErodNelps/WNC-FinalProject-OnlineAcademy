import React, { Component } from 'react';
import { Carousel, Col, Row } from 'react-materialize';
import CourseItem from '../CourseItem'
import 'materialize-css'

class CourseCarousel extends Component {
    render() {
        return (
            <Carousel
                carouselId="Carousel-2"
                className="white-text center"
                options={{
                    fullWidth: true,
                    indicators: true
                }}
                >
                <div>
                        <CourseItem></CourseItem>
                </div>
                <div>
                        <CourseItem></CourseItem>
                </div>
                <div>
                        <CourseItem></CourseItem>
                </div>
                <div>
                        <CourseItem></CourseItem>
                </div>
            </Carousel> 
        );
    }
};

export default CourseCarousel