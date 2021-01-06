import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import {BrowserRouter} from 'react-router-dom'
import Axios from 'axios'
import NavBar from '../NavBar';
import Home from '../layout/Home'

import Login from '../Login'
import Register from '../Register'
import Dashboard from '../Dashboard'
import WebFooter from '../App/footer'
import CourseDetail from '../CourseItem/courseDetail'
import UserContext from "./context/userContext";
import './style.css'
import AddNewCourse from '../Dashboard/addNewCourse';
import MostViewed from '../MostViewed';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(_ => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:8080/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:8080/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{userData,setUserData}}>
            <div className="App">
              <NavBar />
              <Switch>
                <Route exact path="/">
                  <Home></Home>     
                </Route>
                <Route path="/login"> <Login/> </Route>
                <Route path="/register"> <Register/> </Route>
                <Route path="/dashboard"> <Dashboard/> </Route>
                <Route path="/item"> <CourseDetail/> </Route>
                <Route path="/addnewcourse"> <AddNewCourse/></Route>
                <Route path="/most-viewed"><MostViewed></MostViewed></Route>
              </Switch>
              <WebFooter/>
            </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
