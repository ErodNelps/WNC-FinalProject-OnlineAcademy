import React from 'react';
import 'materialize-css'
import { Icon, Col, Card, CardTitle, Preloader} from 'react-materialize'
import './style.css'
import Axios from 'axios';

export default function CourseItem({course}) {
    const handleClick = async () =>{
        console.log(course._id)
        Axios.put("http://localhost:8080/courses/view-count-increment/"+ course._id)
    }

    return (
        <div >
            {course ? 
            <div  style={{ cursor: 'pointer', marginRight: "10px"}}>
                <Col m={6} s={12}>
                <Card
                actions={[<a key="1" href={"/course/"+course._id} onClick={handleClick}>Go to course</a>]}
                closeIcon={<Icon>close</Icon>}
                header={<img className="detail-thumbnail" src={course.thumbnail} width="100" height="100"></img>}
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

