import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage.js";
import CompaniesContainer from "./CompaniesContainer";
import JobsContainer from "./JobsContainer";
import CompanyDetails from "./CompanyDetails";
import ProfileForm from "./ProfileForm";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import UserContext from "./userContext.js";

/** Routes for Jobly App
 * 
 *  Logged in -> 
 *    { Homepage, CompaniesContainer, JobsContainer, CompanyDetails, ProfileForm} and logout
 *  
 *  Not logged in -> { Homepage, SignupForm, Login }
 * 
 *  Context:
 *      - UserContext
 *
 *  App -> Routes
 */
export default function Routes({ login, register, update }) {
  const { currentUser } = useContext(UserContext);

  if (currentUser) {
    return (
      <div className="Routes">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/companies">
            <CompaniesContainer />
          </Route>
          <Route exact path="/jobs">
            <JobsContainer />
          </Route>
          <Route exact path="/companies/:handle">
            <CompanyDetails />
          </Route>
          <Route exact path="/profile">
            <ProfileForm update={update} />
          </Route>
          <Route exact path="/logout">
            <Redirect to='/'/>
          </Route>
          <Redirect to="/"/>
        </Switch>
      </div>
    );
  }

  return (
    <div className="Routes">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/signup">
          <SignupForm register={register}/>
        </Route>
        <Route exact path="/login">
          <LoginForm login={login}/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    </div>
  );
}
