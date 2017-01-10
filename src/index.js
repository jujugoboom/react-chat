import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import './index.css';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDLX4W-LeONlYCe5ogkcCcNtsncleg-D8U",
  authDomain: "test-chat-5242e.firebaseapp.com",
  databaseURL: "https://test-chat-5242e.firebaseio.com",
  storageBucket: "test-chat-5242e.appspot.com",
  messagingSenderId: "560717098276"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
  }
  else{
    ReactDOM.render(
      <Login />,
      document.getElementById('root')
    );
  }
});