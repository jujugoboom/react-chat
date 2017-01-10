import React, { Component } from 'react';
import * as firebase from 'firebase';

const status = {
    login: "Login",
    create: "Create User"
}

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {username: '', password: '', error: '', status: status.login};

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }

    handleEmailChange(event){
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    handleSubmit(){
        if(this.state.status === status.login){
            firebase.app().auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(e => {
                this.setState({error: e.message});
            });
        }
        else if(this.state.status === status.create){
            firebase.app().auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(e => {
                this.setState({error: e.message});
            });
        }
    }

    changeStatus(){
        if(this.state.status === status.login){
            this.setState({status: status.create});
        }
        else{
            this.setState({status: status.login});
        }
    }

    render(){
        var error;
        var buttons;
        if(this.state.status === status.login){
            buttons = <div><button onClick={this.handleSubmit}>Login</button><button onClick={this.changeStatus}>Create new user</button></div>
        }
        else if(this.state.status === status.create){
            buttons = <div><button onClick={this.handleSubmit}>Create new user</button></div>
        }
        if(this.state.error !== ''){
            error = <div>{this.state.error}</div>
        }
        return (
            <div id="login-page">
            {error}
                <div>
                <label>
                E-Mail Address:
                <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                </div>
                <div>
                <label>
                Password:
                <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                </label>
                </div>
                {buttons}
            </div>
        );
    }
}

export default Login;