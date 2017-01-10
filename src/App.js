import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import UpdateProfile from "./UpdateProfile"

const Pages = {
    UpdateProfile: <UpdateProfile />,
    Contacts: "Contacts",
    MessageThread: "Message Thread"
}

class App extends Component {
    constructor(props){
      super(props);
      this.state = {};
      if(firebase.auth().currentUser.displayName === null){
        this.state = {currentPage: Pages.UpdateProfile};
      }
      else{
        this.state = {currentPage: Pages.Contacts};
      }
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
