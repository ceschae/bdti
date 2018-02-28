import React from 'react';
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

export default class Account extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("account");
        return (
            <div className="container">
                <p>I'm in the account page!</p>
            </div>
        );
    }
}