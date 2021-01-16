import React from 'react';
import 'materialize-css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CourseItem from '../CourseItem';


export default function CourseCarousel ({collection}) {
    return (
        <div> {collection ?
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true}
                infinite={true}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {collection.map((course, index) => (
                            <CourseItem key={index} course={course}></CourseItem>))}
              </Carousel>
: <></>}
        </div>
    );
};

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

