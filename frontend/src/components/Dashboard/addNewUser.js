import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from "axios";
import userContext from "../App/context/userContext";
import {Divider ,Dropdown} from 'react-materialize';
import 'materialize-css';

export default function AddNewUser() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const newUser = JSON.stringify({ email, password, firstName, lastName, passwordCheck });
            await Axios.post(
                "http://localhost:8080/users/admin/add-new-user", 
                newUser,
                {headers:{"Content-Type" : "application/json"}}
            ).then(res => {
                alert("New user added!")
                history.push("/dashboard");
            })
                
        } catch (err) {
            if(err != undefined)
                alert(err.response.data.msg);
        }
    };
  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="passwordCheck">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" style={{marginTop:"10px"}}>
          Register
        </Button>
      </Form>
    </div>
  )
}