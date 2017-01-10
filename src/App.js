import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import UpdateProfile from "./UpdateProfile";
import Contacts from "./Contacts";


class App extends Component {
    constructor(props){
      super(props);
      this.state = {};
      this.changePage = this.changePage.bind(this);
      this.handleUpdatedProfile = this.handleUpdatedProfile.bind(this);
      this.pages = {
        updateProfile: <UpdateProfile onFinish={this.handleUpdatedProfile} />,
        contacts: <Contacts />,
        messageThread: <MessageThread />
      };
      if(firebase.auth().currentUser.displayName === null){
        this.state = {currentPage: this.pages.updateProfile};
      }
      else{
        this.state = {currentPage: this.pages.contacts};
      }
    }
    handleUpdatedProfile(){
      this.changePage(this.pages.contacts);
    }
    changePage(page){
      this.setState({currentPage: page});
    }
    render() {
        var currentPage = this.state.currentPage;
      return (
        <div className="App">
          {currentPage}
        </div>
      );
    }
}

export default App;
