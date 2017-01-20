import React, { Component } from 'react';
import * as firebase from 'firebase';

class Contacts extends Component{
    constructor(props){
        super(props);
        this.state = {confirmedContacts: [], unconfirmedContacts: [], pendingContacts: []};
        this.currentUser = firebase.auth().currentUser;
        this.database = firebase.database();
        this.contactDatabase = this.database.ref('contacts/' + this.currentUser.uid);
        this.userDatabase = this.database.ref('users/');
    }
    componentDidMount(){
        this.contactDatabase.on('unconfirmed',(snapshot) => {
            this.setState({unconfirmedContacts: snapshot.val()});
        });
        this.contactDatabase.on('pending', (snapshot) => {
            this.setState({pendingContacts: snapshot.val()});
        });
        this.contactDatabase.on('confirmed', (snapshot) => {
            this.setState({confirmedContacts: snapshot.val()});
        });
    }
    searchPerson(currentSearch){
        this.userDatabase.orderByKey('username').limitToFirst(10).startAt(currentSearch);
    }
    render(){
        return(<div>
            Contacts
            <div></div>
            </div>);
    }
}

export default Contacts;