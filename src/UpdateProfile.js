import React, { Component } from 'react';
import * as firebase from 'firebase';
import ImageUploader from './ImageUploader'

class UpdateProfile extends Component{
    constructor(props){
        super(props);
        this.currentUser = firebase.auth().currentUser;
        this.database = firebase.database().ref('users/');
        this.state = {username: this.currentUser.displayName, picture: this.currentUser.photoURL, error: ''};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.firebaseUploadLocation = firebase.storage().ref().child("users/" + this.currentUser.uid + "/profilePicture.png");
    }
    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }
    handlePhotoChange(newURL){
        this.setState({picture: newURL});
    }
    handleSubmit(){
        this.currentUser.updateProfile({displayName: this.state.username, photoURL: this.state.picture}).then(() => {
            this.database.child(this.currentUser.uid).set({username: this.state.username});
            this.database.child("usernames/").set({uid: this.currentUser.uid});
            this.props.onFinish();
        }).catch((e) => {
            this.setState({error: e});
        });
        
    }
    render(){
        var errorDiv;
        if(this.state.error !== ''){
            errorDiv = <div>{this.state.error.message}</div>
        }
        if(!this.state.username){
            this.state.username = '';
        }
        return(
            <div>
                {errorDiv}
                <div>
                <ImageUploader firebaseRef={this.firebaseUploadLocation} onComplete={this.handlePhotoChange}/>
                </div>
                <div>
                <label>
                Username: 
                <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                </label>
                </div>
                <button onClick={this.handleSubmit} disabled={this.state.username === ''}>Save</button>
            </div>);
    }
}

export default UpdateProfile