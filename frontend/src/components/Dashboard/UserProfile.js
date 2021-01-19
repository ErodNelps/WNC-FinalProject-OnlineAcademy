import React, { useContext, useState } from 'react'
import 'materialize-css'
import {Row, Col, Divider, Button, Modal} from 'react-materialize'
import './style.css'
import userContext from '../App/context/userContext'
import Axios from 'axios'
export default function UserProfile(){
    const {userData} = useContext(userContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] =useState();
    const [repeatPassword, setRepeatPassword] = useState();

    const changePassword = (e) =>{
        e.preventDefault();
    }
    
    const handleChangeName = (e) => {
        e.preventDefault();
        if(firstName == '' || lastName == ''){
            alert("First name or last name is missing!");
            return
        }
        if(firstName.length < 2 || lastName.length < 2){
            alert('Name has to be at least 2 characters longs')
            return
        }
        try{
            Axios.post("http://localhost:8080/change-name/" + userData.user.id, {firstName, lastName}).then(res =>{
                alert('Name changed successfully')
            }).catch((error) => {
                alert(error.response.data.error)
            })
        } catch (err) {
            console.log(err);
        }
    }
    const isEmail = (email) => {
        const re = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
        return re.test(email);
    }
    const handleChangeEmail = (e) => {
        e.preventDefault();
        if(!isEmail(newEmail)){
            alert(newEmail + "is not a real email.")
            return
        }
        try{
            Axios.put("http://localhost:8080/users/change-email/" + userData.user.id, {email: newEmail}).then(res =>{
                alert('Email changed successfully')
            }).catch((error) => {
                alert(error.response.data.msg)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        if(newPassword == '' || oldPassword == '' || repeatPassword ==''){
            alert('Not all fields have been entered')
            return
        }
        if(newPassword.length < 6 || oldPassword.length < 6){
            alert('Password length must be as least 6 characters long')
            return
        }
        if(newPassword == oldPassword){
            alert('New password cannot be the same as old password')
            return
        }
        if(repeatPassword != newPassword){
            alert('Repeat password is different')
            return
        }
        try{
            Axios.put("http://localhost:8080/users/change-password/" + userData.user.id, {oldPassword, newPassword}).then(res =>{
                alert('Password changed successfully')
            }).catch((error) => {
                alert(error.response.data.msg)
            })
        } catch (err) {
            console.log(err);
        }
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
                        <Row> <div className="course-name"> <p className="label">Name: {userData.user.firstName} {userData.user.lastName} 
                        <Modal actions={[<Button flat modal="close" node="button" waves="green">Close</Button>]}
                                                bottomSheet={false}
                                                fixedFooter={false}
                                                header="Change name"
                                                id="Modal-0"
                                                open={false}
                                                options={{
                                                    dismissible: true,
                                                    endingTop: '10%',
                                                    inDuration: 250,
                                                    onCloseEnd: null,
                                                    onCloseStart: null,
                                                    onOpenEnd: null,
                                                    onOpenStart: null,
                                                    opacity: 0.5,
                                                    outDuration: 250,
                                                    preventScrolling: true,
                                                    startingTop: '4%'
                                                }}
                                                trigger={<Button style={{marginRight: "10px"}}><i class="fa fa-pencil" aria-hidden="true"></i></Button>}
                                                >
                                                    <input type="text" placeholder="First Name..." value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                                                    <input type="text" placeholder="LastName..." value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                                                    <Button block size={"lg"} onClick={(e) => handleChangeName(e)}>
                                                        Change
                                                    </Button>
                                            </Modal>
                        </p></div> </Row>
                        <Row> <div className="course-name"> <p className="label">Email: {userData.user.email} 
                        <Modal actions={[<Button flat modal="close" node="button" waves="green">Close</Button>]}
                                                bottomSheet={false}
                                                fixedFooter={false}
                                                header="Change email"
                                                id="Modal-0"
                                                open={false}
                                                options={{
                                                    dismissible: true,
                                                    endingTop: '10%',
                                                    inDuration: 250,
                                                    onCloseEnd: null,
                                                    onCloseStart: null,
                                                    onOpenEnd: null,
                                                    onOpenStart: null,
                                                    opacity: 0.5,
                                                    outDuration: 250,
                                                    preventScrolling: true,
                                                    startingTop: '4%'
                                                }}
                                                trigger={<Button style={{marginRight: "10px"}}><i class="fa fa-pencil" aria-hidden="true"></i></Button>}
                                                >
                                                    <input type="text" placeholder="Email..." value={newEmail} onChange={(e) => setNewEmail(e.target.value)}></input>
                                                    <Button block size={"lg"} onClick={(e) => handleChangeEmail(e)}>
                                                        Change
                                                    </Button>
                                            </Modal>
                        </p></div> </Row>
                        <Row> <div className="course-name"> <p className="label">Password: 
                        <Modal actions={[<Button flat modal="close" node="button" waves="green">Close</Button>]}
                                                bottomSheet={false}
                                                fixedFooter={false}
                                                header="Change name"
                                                id="Modal-0"
                                                open={false}
                                                options={{
                                                    dismissible: true,
                                                    endingTop: '10%',
                                                    inDuration: 250,
                                                    onCloseEnd: null,
                                                    onCloseStart: null,
                                                    onOpenEnd: null,
                                                    onOpenStart: null,
                                                    opacity: 0.5,
                                                    outDuration: 250,
                                                    preventScrolling: true,
                                                    startingTop: '4%'
                                                }}
                                                trigger={<Button style={{marginRight: "10px"}}>Change Password</Button>}
                                                >
                                                    <input type="password" placeholder="Old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}></input>
                                                    <input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                                                    <input type="password" placeholder="Repeat new password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}></input>
                                                    <Button block size={"lg"} onClick={(e) => handleChangePassword(e)}>
                                                        Change
                                                    </Button>
                                            </Modal></p></div> </Row>
                    </div>
                </Col>
            </Row>
            <Divider/></>) : <h2>You are not logged in</h2>}
        </div>
    )
    
}