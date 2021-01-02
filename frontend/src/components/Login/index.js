import React, { useState, useContext } from "react";
import {useHistory} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import Axios from 'axios'
import "./style.css";
import UserContext from '../App/context/userContext'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const validateForm = () => {
    return email.length > 0 && password.length >= 6;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
        const loginUser = { email, password };
        const loginRes = await Axios.post(
          "http://localhost:8080/users/login",
          loginUser
        );
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
      } catch (err) {
        //console.log(err.response.data.msg);
        //&& setError(err.response.data.msg);
    }
    console.log(event.target.email.value)
    console.log(event.target.password.value)
  }

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
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}