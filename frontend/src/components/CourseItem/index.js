import React from 'react';
import 'materialize-css'
import {Link} from 'react-router-dom'
import { Preloader} from 'react-materialize'
import {Card, Button} from 'react-bootstrap'
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
                {/* <Card
                actions={[<Link key="1" to={"/course/"+course._id} onClick={handleClick}>Go to course</Link>]}
                closeIcon={<Icon>close</Icon>}
                header={<div className="card-header"><img className="detail-thumbnail" src={course.thumbnail} width="100" height="100"></img> <Row className="card-title">{course.title}</Row></div>}
                vertical
                revealIcon={<Icon>more_vert</Icon>} className="card"
                >
                
                <Row className="card-fulldescription">{course.briefDes}</Row>
                <Row>$ {course.price}</Row>
                <Row>{course.rating}</Row>
                </Card> */}
                <Card style={{ width: '18rem', height:"335px" }}>
                    <Card.Img variant="top" src={course.thumbnail} className="card-image"/>
                    <Card.Body>
                        <Card.Title className="card-title">{course.title}</Card.Title>
                        <Card.Text style={{textOverflow: "ellipsis", height:"30px", whiteSpace:"nowrap", overflow: "hidden", margin:"0px 5px 0px 5px"}}>
                        {course.briefDes}
                        </Card.Text>
                        <Card.Text style={{margin:"0px 5px 0px 5px"}}>Price: ${course.price}</Card.Text>
                        <Card.Text style={{margin:"0px 5px 0px 5px"}}>Rating: {course.rating}</Card.Text>
                        <Link key="1" to={"/course/"+course._id} onClick={handleClick} style={{alignItems:"center"}}><Button variant="primary" style={{alignSelf:"center", marginLeft:"20px", marginRight:"20px", border:"none", background:"none", backgroundColor:"transparent"}}>Go to course</Button></Link>
                    </Card.Body>
                </Card>
           </div> : <Preloader/>}
        </div>
    )
}

