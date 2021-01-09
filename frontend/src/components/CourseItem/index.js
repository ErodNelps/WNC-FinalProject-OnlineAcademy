import React from 'react';
import 'materialize-css'
import { Icon, Col, Card, CardTitle, Preloader} from 'react-materialize'
import './style.css'

export default function CourseItem({course}) {
    const handleClick = () =>{
        console.log(course._id)
    }

    return (
        <div >
            {course ? 
            <div  style={{ cursor: 'pointer'}}>
                <Col m={6} s={12}>
                <Card
                actions={[<a key="1" href={"/course/"+course._id} onClick={handleClick}>Go to course</a>]}
                closeIcon={<Icon>close</Icon>}
                header={<CardTitle image={course.thumbnail} />}
                horizontal
                revealIcon={<Icon>more_vert</Icon>} className="description"
                >
                {course.title}
                {course.briefDes}
                </Card>
            </Col></div> : <Preloader/>}
        </div>
    )
}

