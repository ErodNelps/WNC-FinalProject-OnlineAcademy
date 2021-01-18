import React, { useContext, useState } from 'react';
import userContext from '../App/context/userContext'
import './style.css'
import 'materialize-css'
import {Button} from 'react-bootstrap'
import Ratings from 'react-ratings-declarative';

export default function CommentBox({comments = [], courseID=''}){
    const {userData, setUserData} = useContext(userContext)
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    
    // constructor() {
    //   super();
      
    //   this.state = {
    //     showComments: false,
    //     comments: [
    //       {id: 1, author: "landiggity", body: "This is my first comment on this forum so don't be a dick"},
    //       {id: 2, author: "scarlett-jo", body: "That's a mighty fine comment you've got there my good looking fellow..."},
    //       {id: 3, author: "rosco", body: "What is the meaning of all of this 'React' mumbo-jumbo?"}
    //     ]
    //   };
    // }
    
    // render () {
    //   const comments = this._getComments();
    //   let commentNodes;
    //   let buttonText = 'Show Comments';
      
    //   if (this.state.showComments) {
    //     buttonText = 'Hide Comments';
    //     commentNodes = <div className="comment-list">{comments}</div>;
    //   }
    const handleSummitComment = () =>{

    }

    return(
    <div className="comment-box">
        <h3>Rate course 
            <Ratings rating={rating} widgetRatedColors="blue"changeRating={(newRating) => setRating(newRating)}>
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget widgetDimension="60px" svgIconViewBox="0 0 5 5" svgIconPath="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" />
                <Ratings.Widget widgetHoverColor="black" />
                <Ratings.Widget />
            </Ratings>
        </h3>
        {/* {comment form} */}
        <form className="comment-form" onSubmit={handleSummitComment}>
          <div className="comment-form-fields">
            <textarea placeholder="Comment" rows="4" required value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          </div>
          <div className="comment-form-actions">
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
                <p className="comment-header">{comment.userFirstName} {comment.userLastName} <Ratings rating={comment.rating} widgetRatedColors="blue"changeRating={(newRating) => setRating(newRating)}>
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget widgetDimension="60px" svgIconViewBox="0 0 5 5" svgIconPath="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" />
                <Ratings.Widget widgetHoverColor="black" />
                <Ratings.Widget />
            </Ratings></p>
                <p className="comment-body">- {comment.comment}</p>
            </div>
        ))}</> : <></>}
        
    </div>  
    );
}