import React, { Component } from 'react';
import * as firebase from 'firebase';

const header_style = {
        display: 'inline',
        float: 'right'
    };
    
class ProfileHeader extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.callback();
    }
    render(){
        return(
            <div>
                <img src={firebase.auth().currentUser.photoURL} height={20} style={header_style} onClick={this.handleClick}/>
            </div>    
        )
    }
}

export default ProfileHeader