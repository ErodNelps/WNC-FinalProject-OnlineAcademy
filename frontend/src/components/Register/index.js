import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import UserContext from "../App/context/userContext";
import Axios from "axios";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [otp, setOTP] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  async function handleOTP(event) {
    event.preventDefault();

    try {
      const reqEmail = JSON.stringify({email})
      await Axios.post("http://localhost:8080/users/register/sendOTP", reqEmail,
      {headers:{"Content-Type" : "application/json"}});
    } catch (err) {
      console.log(err.response.data);
    }
  } 

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const newUser = JSON.stringify({ email, password, firstName, lastName, passwordCheck, otp});
      await Axios.post(
        "http://localhost:8080/users/register", 
        newUser,
        {headers:{"Content-Type" : "application/json"}}
      );
      const loginRes = await Axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      console.log(err.response.data);
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
        <Form.Group size="lg" controlId="OTP">
          <Form.Label>Verification code</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          /> <Button block size="lg" onClick={handleOTP} style={{marginTop:"10px"}}>
          Send OTP
        </Button>
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