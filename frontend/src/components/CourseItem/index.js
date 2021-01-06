import React from 'react';
import { Icon, Col, Card, CardTitle, Preloader} from 'react-materialize'
import 'materialize-css'
import './style.css'

export default function CourseItem({course}) {
    const handleClick = () =>{
        console.log("clicked")
    }

    return (
        <div>
            {course ? 
            <Col
                m={6}
                s={12}>
                <Card
                actions={[
                    <a key="1" href="#">This is a link</a>
                ]}
                closeIcon={<Icon>close</Icon>}
                header={<CardTitle image={course.thumbnail} />}
                horizontal
                revealIcon={<Icon>more_vert</Icon>} className="description"
                >
                {course.title}
                {course.briefDes}
                </Card>
            </Col> : <Preloader/>}
        </div>
    )
}
