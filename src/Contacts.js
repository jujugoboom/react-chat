import React, { Component } from 'react';
import * as firebase from 'firebase';

class Contacts extends Component{
    constructor(props){
        super(props);
        this.state = {confirmedContacts: [], unconfirmedContacts: [], pendingContacts: []};
        this.database = firebase.database();
        this.contactDatabase = this.database.ref('contacts/' + this.currentUser.uid);
        this.userDatabase = this.database.ref('users/');
        this.currentUser = firebase.auth().currentUser;
    }
    componentDidMount(){
        this.contactDatabase.child("unconfirmed").on((snapshot) => {
            this.setState({unconfirmedContacts: snapshot.val()});
        });
        this.contactDatabase.child("pending").on((snapshot) => {
            this.setState({pendingContacts: snapshot.val()});
        });
        this.contactDatabase.child("confirmed").on((snapshot) => {
            this.setState({confirmedContacts: snapshot.val()});
        });
    }
    searchPerson(currentSearch){
        this.userDatabase.orderByKey('username').limitToFirst(10).startAt(currentSearch);
    }
    render(){
        return(<div></div>)
    }
}

export default Contacts;