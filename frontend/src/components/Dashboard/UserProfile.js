import React, { useContext } from 'react'
import 'materialize-css'
import {Row, Col, Divider, Button} from 'react-materialize'
import './style.css'
import userContext from '../App/context/userContext'

export default function UserProfile(){
    const {userData} = useContext(userContext);
    const changePassword = () =>{
        
    }
    
    return(
        <div>
            {userData.user ? 
            (<><Row>
                <Col className="thumbnail" >
                    <>
                        {(userData.user.role==='student' || userData.user.role==='lecturer') ? (<img className="detail-thumbnail" src="user-student.png" width="200" height="200"></img>) : 
                        (<img className="detail-thumbnail" src="user-lecturer.png" width="200" height="200"></img>)}
                    </>
                </Col>
                <Col className="detail-description" s={9}>
                    <div >
                        <Row> <div className="course-name"> <p className="label">Email: {userData.user.email}</p></div> </Row>
                        <Row> <div className="course-name"> <p className="label">Password: <Button onClick={changePassword} style={{marginRight: "10px"}}>Change Password</Button></p></div> </Row>
                    </div>
                </Col>
            </Row>
            <Divider/></>) : <h2>You are not logged in</h2>}
        </div>
    )
    
}