import React from 'react';
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currUser: undefined
        }
    }

    componentWillMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(
            (loggedUser) => {this.setState({currUser: loggedUser})});
    }

    componentWillUnmount() {
        this.authUnsub();
        //firebase.database().ref("todos").off("value");
    }

    render() {
        return (
            <div className="container">
                <p>Welcome! Are you bored? How about doing something? Click the button below to find something to do!</p>
            </div>
        );
    }
}