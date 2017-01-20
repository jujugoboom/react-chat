import React, { Component } from 'react';

class Message extends Component{
    constructor(props){
        super(props);
        this.state = {status: this.props.id};
    }
    render(){
        return(
            <div className="message">
                <div className="messageSender">{this.props.sender}</div>
                <div className="messageContent">{this.props.content}</div>
                <div className="messageDate">{this.props.date}</div>    
                <div className="messageStatus">{this.state.status}</div>
            </div>
        );
    }
} 

export default Message;