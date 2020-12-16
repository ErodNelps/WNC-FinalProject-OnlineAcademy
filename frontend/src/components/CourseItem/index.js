import React, { Component } from 'react';
import {Row, Icon, Col, Card, CardTitle} from 'react-materialize'
import 'materialize-css'
import './style.css'

class CourseItem extends Component {
    render(){
        return (
        <div>
            <Col
                m={6}
                s={12}>
                <Card
                actions={[
                    <a key="1" href="#">This is a link</a>
                ]}
                closeIcon={<Icon>close</Icon>}
                header={<CardTitle image="https://materializecss.com/images/sample-1.jpg" />}
                horizontal
                revealIcon={<Icon>more_vert</Icon>} className="description"
                >
                Here is the standard card with a horizontal image.
                </Card>
            </Col>
        </div>
    )}
}

export default CourseItem
