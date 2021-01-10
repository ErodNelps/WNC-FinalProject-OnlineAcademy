import React, { useContext, useEffect } from 'react'
import 'materialize-css'
import { Row, Col, Divider, Button} from 'react-materialize'
import { connect } from 'react-redux'
import './style.css'
import userContext from '../App/context/userContext'
import store from '../../redux/store'
import { fetchCourseSeleccted } from '../../redux/course'
import { useHistory } from 'react-router-dom'

const CourseDetail = ({courseSelected}) =>{
    const {userData} = useContext(userContext);
    let history = useHistory()
    let id = history.location.pathname.replace('/course/','')
    useEffect(() =>{
        store.dispatch(fetchCourseSeleccted(id))
    },[])
    const handleBuyBtn = () =>{
        if(userData.user){

        }
        else{
            alert("You have to log in to buy a course!");
        }
    }

    return(
        <div className="course-detail">
            {courseSelected ? 
            (<><Row>
                <Col className="thumbnail" >
                    <img className="detail-thumbnail"
                    src={courseSelected.thumbnail} 
                    maxwidth="200" maxheight="200"></img>
                </Col>
                <Col className="detail-description" s={9}>
                    <div >
                        <Row> <div className="course-name">{courseSelected.title}</div> </Row>
                        <Row><div>{courseSelected.briefDes}</div></Row>
                        <Row>Rating: {courseSelected.rating}</Row>
                        <Button onClick={handleBuyBtn}>Buy course</Button>
                    </div>
                </Col>
            </Row>
            <Divider/>
            <Row style={{marginTop:'20px', color: "floralwhite"}}>
                <Col s={4} style={{textAlign:'center'}}>Last updated: </Col>
                <Col s={4} style={{textAlign:'center'}}>Rating count: {courseSelected.rateCount}</Col>
                <Col s={4} style={{textAlign:'center'}}>Paticipant: {courseSelected.subCount}</Col>
            </Row>
            <Divider/>
            <Row className="full-description">{courseSelected.fullDes}</Row>
            <Divider/></>) : <p>Course not found</p>}
        </div>
    )
};

const mapStateToProps = state =>{
    const courseSelected = state.courseReducer.courseSelected;
    return {courseSelected}
};

export default connect (mapStateToProps)(CourseDetail)