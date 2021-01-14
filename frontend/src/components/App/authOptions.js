import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "./context/userContext";
import {Button, Divider, Dropdown} from 'react-materialize'
import 'materialize-css'
import './style.css'

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <React.Fragment>
      {userData.user ? (
        <Dropdown
        id="Dropdown_user"
        options={{
          alignment: 'left',
          autoTrigger: true,
          closeOnClick: true,
          constrainWidth: true,
          container: null,
          coverTrigger: false,
          hover: false,
          inDuration: 150,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 250
        }}
        trigger={<a style={{display: "block" }}><img src="user-student.png" style={{ height:"45px", width: "45px"}}/></a>}
        >
          <Link to="/dashboard" >Dashboard</Link>
          <a onClick={logout} >Log out</a>
        <Divider></Divider>
      </Dropdown>
        
        ) : (
          <>
              <Button onClick={register} style={{marginRight: "10px"}}>Sign up</Button>
              <Button onClick={login} style={{marginRight: "10px"}}>Log in</Button>
            </>
          )}
    </React.Fragment>
  );
}