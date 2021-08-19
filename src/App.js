import 'bootswatch/dist/united/bootstrap.min.css';
import './App.css';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import React, { useEffect, useState } from 'react';
import JoblyApi from './api';
import jwt from "jsonwebtoken";
import UserContext from './userContext';

/** Jobly App.
 * 
 *  After sucessful login or register, token gets stored in state/localStorage.
 *  Current user retrieved from token, and passed down via context.
 * 
 *  States:
 *    - token
 *    - currentUser
 * 
 *  App -> { Navbar, Routes }
 */
function App() {
  const [token, setToken] = useState(localStorage.token);
  const [currentUser, setCurrentUser] = useState(null);
  //TODO: state about loading for logging in/registering

  useEffect(function storeUser() {
    async function fetchUser() {
      // only fetch a user if a token is stored
      if (token) {
        // store token from login/register process to JoblyApi class
        JoblyApi.token = token;
        localStorage.token = token;
  
        let { username } = jwt.decode(token);
        let user = await JoblyApi.getUser(username);
        
        setCurrentUser(user);
      }
    }
    fetchUser();
  }, [token])

  /** Takes object like {username, password} */

  async function login({username, password}) {
    try {
      let token = await JoblyApi.login(username, password);
      setToken(token);
      return true;
    } catch (err) {
      alert(err[0]);
      return false;
    }
  }

  /** user object like 
   *       {username, password, first_name, last_name, email} */
  async function register(user) {
    try {
      let token = await JoblyApi.register(user);
      setToken(token);
      return true;
    } catch (err) {
      alert(err[0]);
      return false;
    }
  }

  /** Log user out. */

  function logout() {
    setToken(null);
    setCurrentUser(null);
    localStorage.clear();
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={currentUser}>
        <Navbar logout={logout} />
        <Routes login={login} register={register} />
      </UserContext.Provider>
    </BrowserRouter>
    
  );
}

export default App;
