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

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [list, setList] = useState([]);
  const [visibleList, setVisibleList] = useState([]);

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

  useEffect(_ => {
    setTimeout(_ => {
      const items = [
        { id: 1, title: 'Pay Bills', is_done: true },
        { id: 2, title: 'Learn ReactJS', is_done: false },
        { id: 3, title: 'Learn NodeJS Express', is_done: false },
        { id: 4, title: 'Learn PassportJS', is_done: false },
        { id: 5, title: 'Complete Final Project', is_done: false },
        { id: 6, title: 'Have Dinner', is_done: true },
      ];
      setList(items);
      setVisibleList(items);
    })
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
              </Switch>
              <WebFooter/>
            </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
