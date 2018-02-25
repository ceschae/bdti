import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Account from "./components/Account";
import constants from "./components/constants";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: null,
      errCode: ""
    }
  }

  componentWillMount() {
    this.authUnsub = firebase.auth().onAuthStateChanged(loggedUser => {
      this.setState({currUser: loggedUser});
    });
  }

  componentWillUnmount() {
    this.authUnsub();
  }

  handleSignOut(evt) {
    evt.preventDefault();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to={constants.routes.home}>
              <h1 className="App-title">Bored? Do This Instead</h1>
            </Link>
            {
              firebase.auth().currentUser ? 
              <div>
                <Link to={constants.routes.account}><button className="btn primary-btn" >Account</button></Link>
                <button className="btn primary-btn" onClick={evt => this.handleSignOut(evt)}>Log out</button>
              </div> :
              <Redirect to="/" />
            }
          </header>
          <div className="container">
            <Switch>
                <Route exact path={constants.routes.signin} component={SignIn} />
                <Route path={constants.routes.home} component={Home} />
                <Route path={constants.routes.account} component={Account} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
