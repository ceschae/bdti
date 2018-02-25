import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import constants from './components/constants';
import App from './App';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import registerServiceWorker from './registerServiceWorker';

// Initialize Firebase
var config = {
    apiKey: constants.firebase.apiKey,
    authDomain: constants.firebase.authDomain,
    databaseURL: constants.firebase.databaseURL,
    projectId: constants.firebase.projectId,
    storageBucket: constants.firebase.storageBucket,
    messagingSenderId: constants.firebase.messagingSenderId
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
