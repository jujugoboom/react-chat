import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import UpdateProfile from "./Profile/UpdateProfile";
import Contacts from "./Contacts/Contacts";


class App extends Component {
    constructor(props){
      super(props);
      this.state = {};
      this.changePage = this.changePage.bind(this);
      this.handleUpdatedProfile = this.handleUpdatedProfile.bind(this);
      this.pages = {
        updateProfile: <UpdateProfile onFinish={this.handleUpdatedProfile} />,
        contacts: <Contacts />,
        messageThread: "messageThread"
      };
      if(firebase.auth().currentUser.displayName === null){
        this.state = {currentPage: this.pages.updateProfile, error: ''};
      }
      else{
        this.state = {currentPage: this.pages.contacts, error: ''};
      }
      this.logout = this.logout.bind(this);
    }
    handleUpdatedProfile(){
      this.changePage(this.pages.contacts);
    }
    changePage(page){
      this.setState({currentPage: page});
    }
    logout(){
      firebase.auth().signOut().catch((e) => {
        this.setState({error: e});
      });
    }
    render() {
        var currentPage = this.state.currentPage;
        var errorDiv;
        if(this.state.error !== ''){
          errorDiv = <div>{this.state.error.message}</div>
        }
      return (
        <div>
        <div className="logout">
          <button onClick={this.logout}>Log out</button>
        </div>
        <div className="App">
          {currentPage}
        </div>
        </div>
      );
    }
}

export default App;
