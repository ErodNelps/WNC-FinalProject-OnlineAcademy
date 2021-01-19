import React, { useContext, useEffect, useState } from 'react'
import 'materialize-css'
import { Row, Col, Divider, Button} from 'react-materialize'
import { connect } from 'react-redux'
import './style.css'
import userContext from '../App/context/userContext'
import store from '../../redux/store'
import { checkIsSubbed, fetchCourseSeleccted, checkIsWatched, checkMyCourse, addWatchList, subscribeToCourse, fetchSyllabus, fetchComment } from '../../redux/course'
import { useHistory } from 'react-router-dom'
import CommentBox from './comment'
import Axios from 'axios'
import Ratings from 'react-ratings-declarative'

const CourseDetail = ({courseSelected, isSubbed, isWatched, isMine, syllabus = [], comments =[]}) =>{
    const {userData} = useContext(userContext);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    let history = useHistory()
    let id = history.location.pathname.replace('/course/','')
    useEffect(() =>{
        store.dispatch(fetchCourseSeleccted(id))
        if(userData.user) {
            store.dispatch(checkMyCourse(userData.user.id, id))
            store.dispatch(checkIsSubbed(userData.user.id, id))
            store.dispatch(checkIsWatched(userData.user.id, id))
            store.dispatch(fetchSyllabus(id))
            store.dispatch(fetchComment(id))
        }
    },[])

    // const commentOnChange = async (id) =>{
    //     try {
    //         const res = await Axios.get("http://localhost:8080/courses/fetch-comment/" + id);
    //         let results = []
    //         let user = {}
    //         for(var i in res.data){
    //             var data = res.data[i];
    //             Axios.get("http://localhost:8080/users/"+ data.userID).then( res =>{
    //               user = res
    //               console.log("res 1: " + res)
    //             })
                
    //             results.push({id: data._id, courseID: data.courseID, userFirstName: user.firstName, userLastName: user.lastName, comment: data.comment, rating: data.rating})
    //         }
    //     } catch(error){
    //     }
    // }
    const handleSummitComment = (e) =>{
        e.preventDefault();
        store.dispatch(fetchComment(id))
    }
    const handleAnynomous = () =>{
        if(userData.user){

        }
        else{
            alert("You have to log in!");
        }
    }

    const handleBuyBtn = () =>{
        if(userData.user){
            alert("Subbing")
            store.dispatch(subscribeToCourse(userData.user.id, id))
        }
        else{
            alert("You have to log in!");
        }
    }

    const handleJoin = () =>{
        if(userData.user){
            history.push("/join/"+id);
        }
        else{
            alert("You have to log in!");
        }
    }

    const handleUnadded = () =>{
        if(userData.user){

        }
        else{
            alert("You have to log in!");
        }
    }

    const handleWatchlist = async () =>{
        if(userData.user){
            store.dispatch(addWatchList(userData.user.id, id))
        }
        else{
            alert("You have to log in!");
        }
    }

    return(
        <div className="course-detail">
            {courseSelected ? 
            (<><Row>
                <Col className="thumbnail" >
                    <img className="detail-thumbnail"
                    src={courseSelected.thumbnail} 
                    width="200" height="200"></img>
                </Col>
                <Col className="detail-description" s={9}>
                    <div >
                        <Row> <div className="course-name">{courseSelected.title}</div> </Row>
                        <Row><div>{courseSelected.briefDes}</div></Row>
                        <Row>Rating: {courseSelected.rating}</Row>
                        {/* {userData.user ? (<>{isSubbed ? <Button style={{marginLeft:"10px"}} onClick={handleJoin}>Join</Button>: <Button onClick={handleBuyBtn}>Buy course</Button>}</>) :
                            <Button onClick={handleAnynomous}>Buy course</Button>}
                        {userData.user ? (<>{isWatched? <Button style={{marginLeft:"10px"}} onClick={handleUnadded}>Added to watchlist</Button> : <Button onClick={handleWatchlist}>Watchlist</Button>}</>) :
                            <></>} */}
                        {userData.user ? <>{isMine ? <Button className="fa fa-pencil" onClick={handleBuyBtn} style={{marginLeft:"10px"}} ></Button> : 
                                                        (<>{isSubbed ? <Button style={{marginLeft:"10px"}} onClick={handleJoin}>Joined</Button> : <Button onClick={handleBuyBtn} style={{marginLeft:"10px"}}>Join course</Button>}
                                                        {isWatched ?  <Button style={{marginLeft:"10px"}} onClick={handleUnadded}>Added to Watchlist</Button> : <Button onClick={handleWatchlist} style={{marginLeft:"10px"}}>Add toWatchlist</Button>}</>)}
                                        </> : <Button onClick={handleAnynomous} style={{marginLeft:"10px"}}>Join course</Button>}
                    </div>
                </Col>
            </Row>
            <Divider/>
            <Row style={{marginTop:'20px', color: "floralwhite"}}>
                <Col s={4} style={{textAlign:'center'}}>Last updated: {courseSelected.updatedAt}</Col>
                <Col s={4} style={{textAlign:'center'}}>Rating count: {courseSelected.rateCount}</Col>
                <Col s={4} style={{textAlign:'center'}}>Paticipant: {courseSelected.subCount}</Col>
            </Row>
            <Divider/>
                <Row style={{marginTop:'20px', color: "floralwhite"}}>
                    {courseSelected.lecturer.data ? 
                    <><Col s={5} style={{textAlign:'center'}}>Lecturer: {courseSelected.lecturer.data.firstName} {courseSelected.lecturer.data.lastName}</Col>
                    <Col s={5} style={{textAlign:'center'}}>Email: {courseSelected.lecturer.data.email}</Col></>: <></>}
                </Row>
            <Divider/>
            <Row className="full-description" dangerouslySetInnerHTML={{__html: courseSelected.fullDes}}></Row>
            <Divider/>
            <Row className="full-description"><ul>{syllabus ? <>{syllabus.map((vid) => (
                       <li key={vid._id}>
                       {vid.name}
                       
                     </li>
            ))}</> : <></>}</ul></Row>
            <Divider/>
            <div className="comment-box">
        <h3>Rate course 
            
        </h3>
        {/* {comment form} */}
        <form className="comment-form" onSubmit={handleSummitComment}>
          <div className="comment-form-fields">
            <textarea placeholder="Comment" rows="4" required value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          </div>
          <div className="comment-form-actions">
          <Ratings rating={rating} widgetRatedColors="blue" changeRating={(newRating) => setRating(newRating)}>
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget/>
                <Ratings.Widget/>
                <Ratings.Widget />
            </Ratings>
            <Button type="submit">Post Comment & Rating</Button>
          </div>
        </form>
        {/* {buttonText} */}
        <h4>Comments</h4>
        <h4 className="comment-count">
        {/* {this._getCommentsTitle(comments.length)} */}
        </h4>
        {/* Map comment here*/}
        {comments ? <>{comments.map((comment, index) => (
            <div key={index} className="comment">
                <p className="comment-header">{comment.userFirstName} {comment.userLastName} 
                {/* <Ratings rating={comment.rating}>
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget/>
                    <Ratings.Widget/>
                    <Ratings.Widget />
                </Ratings> */}
            </p>
                <p className="comment-body">- {comment.comment}</p>
            </div>
        ))}</> : <></>}
        
    </div>
            </>) : <p>Course not found</p>}
        </div>
    )
};

const mapStateToProps = state =>{
    const courseSelected = state.courseReducer.courseSelected;
    const isSubbed = state.courseReducer.isSubbed;
    const isWatched = state.courseReducer.isWatched;
    const isMine = state.courseReducer.isMine;
    const syllabus = state.courseReducer.syllabus;
    const comments = state.courseReducer.comments;
    console.log(comments)
    return {courseSelected, isSubbed, isWatched, isMine, syllabus, comments}
};

export default connect (mapStateToProps)(CourseDetail)