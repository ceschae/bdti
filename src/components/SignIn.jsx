import React from 'react';
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            errCode: "",
            errCredential: ""
        }
    }

    componentWillMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(loggedUser => {
            if (loggedUser) {
                this.setState({auth: true});
            }
        });
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    handleSignIn(evt) {
        evt.preventDefault();
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(result) {
            let token = result.credential.accessToken;
            () => this.setState({auth: true});
        }).catch(function(error) {
            let errCode = error.code;
            let message = error.message;
            alert(errCode + ", " + message);
            let credential = error.credential;
            () => this.setState({
                errCredential: credential,
                errCode: message
            });
        }); 
    }

    render() {
        return (
            <div className="container">
                {
                    this.state.auth ? 
                    <Redirect to="/home" /> : 
                    <Redirect to="/" />
                }
                <button className="btn primary-btn" onClick={evt => this.handleSignIn(evt)}>Log in</button>
            </div>
        );
    }
}