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
import Search from '../Search'
import AddNewUser from '../Dashboard/addNewUser';
import AddNewChapter from "../Dashboard/addNewChapter";
import CourseJoin from '../CourseItem/courseJoin';

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
                <Route path="/login" key={"login"}> <Login/> </Route>
                <Route path="/register" key={"register"}> <Register/> </Route>
                <Route path="/dashboard" key={"dashboard"}> <Dashboard/> </Route>
                <Route path="/addnewcourse" key={"addcourse"}> <AddNewCourse/></Route>
                <Route path="/course/:id" key={"course"}><CourseDetail></CourseDetail></Route>
                <Route path="/join/:id" key={"join"}><CourseJoin></CourseJoin></Route>
                <Route path="/addnewuser" key={"addnewuser"}><AddNewUser></AddNewUser></Route>
                <Route path="/addchapter/:id" key={"addchapter"}><AddNewChapter></AddNewChapter></Route>
                <Route path="/search" key={"search"}><Search></Search></Route>
              </Switch>
              <WebFooter/>
            </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
