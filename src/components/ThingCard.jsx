import React from 'react';
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import constants from "./constants";

export default class ThingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currUser: undefined,
            imgUrl: constants.default.imgUrl,
            err: false
        }
    }

    componentWillMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(
            (loggedUser) => {this.setState({currUser: loggedUser})});
    }

    render() {
        if (!this.state.currUser) {
            return <div>Loading user... Please be patient</div>;
        } 
        let thing = this.props.thingSnapshot.val();        
        return (
            <Link to={{pathname:'/' + this.props.thingSnapshot.key}}>
                <div className="card" style={{"width": "18rem"}}>
                    <img className="card-img-top" src={thing.img} alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{thing.title}</h5>
                        <p className="card-text">{thing.description}</p>
                        <a href="#" className="btn btn-primary">Check this out</a>
                    </div>
                </div>
            </Link>
        );
    }
}