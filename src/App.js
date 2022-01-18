import './App.css';
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
// import Profile from './components/Profile';
import { useAuth0 } from '@auth0/auth0-react';

function App() {

  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div >
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item" >
            { isAuthenticated ? (
              <a onClick={()  => logout()} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.nickname}
              </a>
            ) : (            
              <a onClick={() => loginWithRedirect()} className="nav-link" style={{cursor:'pointer'}}>
                Log In
              </a>
            )}

          </li>
        </div>
      </nav>

      <div className="container mt-3">
        {/* <Profile /> */}
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
          <Route 
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;