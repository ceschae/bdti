import React from 'react';
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default class ThingDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currUser: undefined,
            thingRef: undefined
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
        if(!this.state.currUser) {
            return <div>Loading the user... Please be patient</div>;
        }

        firebase.database().ref("users/" + this.state.currUser.uid + "/things/" + this.props.match.params.thingKey)
            .once("value")
            .then(snapshot => {
                this.setState({thingRef: snapshot.val()});
        });

        if(!this.state.thingRef) {
            return <div>Loading the thing... Please be patient</div>;
        }
        console.log(this.state.thingRef);

        return (
            <div className="container">
                <h3>{this.state.thingRef.title}</h3>
                <p>{this.state.thingRef.description}</p>
            </div>
        );
    }
}