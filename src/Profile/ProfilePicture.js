import React, { Component } from 'react';
import * as firebase from 'firebase';

class ProfilePicture extends Component{
    constructor(props){
        super(props)
        this.state = {error: ''};
    }
    render(){
        let pictureRef = firebase.storage().ref().child("users/" + this.props.uid + "/profilePicture.png");
        var picture;
        var errorDiv;
        pictureRef.getDownloadURL.then((url) => {
            picture = <img src={url}/>
        }).catch((e) => {
            this.setState({error: e.message});
        });
        if(this.state.error !== ''){
            errorDiv = <div>{this.state.error.message}</div>
        }
        return(
            <div>
                {errorDiv}
                {picture}
            </div>
        )
    }
}