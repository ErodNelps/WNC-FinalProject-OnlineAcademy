import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./context/userContext";
import {Navbar, Icon, Dropdown, Divider, Button} from 'react-materialize'
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
  };

  return (
    <React.Fragment>
      {userData.user ? (
        <Button onClick={logout}>Log out</Button>
        ) : (
          <>
              <Button onClick={register}>Sign in</Button>
              <Button onClick={login}>Log in</Button>
            </>
          )}
    </React.Fragment>
  );
}