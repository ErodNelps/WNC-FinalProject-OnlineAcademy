import { useEffect, useState } from 'react';
import { Route, Router, Switch } from 'react-router';
import {BrowserRouter} from 'react-router-dom'
import Axios from 'axios'
import NavBar from '../NavBar';
import CourseCarousel from '../Carousel'
import Login from '../Login'
import Register from '../Register'
import UserContext from "./context/userContext";
import './style.css'

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
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
      <BrowserRouter>
        <UserContext.Provider value={{userData,setUserData}}>
          <div className="App">
            <NavBar />
            <Switch>
              <Route exact path="/">
                <div>
                  <div className="pageMargin">
                    <p className="label">Nổi bật tuần qua</p>
                    <CourseCarousel/>
                  </div>
                </div>
              </Route>
              <Route path="/login"> <Login/> </Route>
              <Route path="/register"> <Register/> </Route>
            </Switch>
           </div>
        </UserContext.Provider> */
      </BrowserRouter>
  );
}

export default App;
