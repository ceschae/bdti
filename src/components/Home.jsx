import React from 'react';
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import ThingCard from "./ThingCard";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currUser: undefined,
            userRef: undefined
        }
    }

    componentWillMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(
            (loggedUser) => {this.setState({currUser: loggedUser})});
    }

    componentWillUnmount() {
        this.authUnsub();
        firebase.database().ref("users").off("value");
    }

    render() {
        if (!this.state.currUser) {
            return <div>Loading... Please be patient</div>;
        }
        firebase.database().ref("users/" + this.state.currUser.uid + "/things")
            .once("value")
            .then(snapshot => {
                this.setState({thingsRef: snapshot});
        });

        if(!this.state.thingsRef) {
            return <div>Loading... Please be patient</div>;
        }

        let things = [];
        this.state.thingsRef.forEach(thingSnapshot => {
            things.push(
                <ThingCard key={thingSnapshot.key} thingSnapshot={thingSnapshot} />
            );
        });
        return (
            <div className="container">
                <div id="header">
                    <p>Welcome! Are you bored? How about doing something? Click on any of the cards to know what to do, or add a new thing here:</p>
                    <button type="button" class="btn btn-primary">Add New Activity</button>
                </div>
                <div id="activities">
                    {things}
                </div>
            </div>
        );
    }
}