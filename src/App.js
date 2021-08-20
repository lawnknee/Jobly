import 'bootswatch/dist/litera/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import './App.css';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import React, { useEffect, useState } from 'react';
import JoblyApi from './api';
import jwt from "jsonwebtoken";
import UserContext from './userContext';
import Loading from './Loading';

/** Jobly App.
 * 
 *  After sucessful login or register, token gets stored in state/localStorage.
 *  Current user retrieved from token, and passed down via context.
 * 
 *  States:
 *    - token
 *    - currentUser
 *    - infoLoaded
 * 
 *  Context:
 *    - creates UserContext
 * 
 *  App -> { Navbar, Routes }
 */
function App() {
  const [token, setToken] = useState(localStorage.token);
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);

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
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    fetchUser();
  }, [token]);

  /** Login user: 
   *  Takes object like {username, password} 
   */
  async function login({ username, password }) {
    let token = await JoblyApi.login(username, password);
    setToken(token);
  }

  /** Register user: 
   *  user object like 
   *    {username, password, first_name, last_name, email} 
   */
  async function register(user) {
    let token = await JoblyApi.register(user);
    setToken(token);
  }

  /** Update user:
   *  user object like
   *    { username, firstName, lastName, email}
   */
  async function update(username, formData) {
    let user = await JoblyApi.updateUser(username, formData);
    setCurrentUser(user);
  }

  /** Log user out. */

  function logout() {
    setToken(null);
    setCurrentUser(null);
    localStorage.clear();
  }

  if (!infoLoaded) return <Loading />;

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navbar logout={logout} />
        <Routes login={login} register={register} update={update} />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;