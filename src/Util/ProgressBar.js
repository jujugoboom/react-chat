import React, { Component } from 'react';

class ProgressBar extends Component{
    constructor(props){
        super(props);
        this.getProgress = this.getProgress.bind(this);
        this.getPercentage = this.getPercentage.bind(this);
    }
    getProgress(){
        let amount = parseInt((this.props.done/this.props.total)* 10);
        let symbol = '#';
        let progress = symbol.repeat(amount) + '. '.repeat(10-amount);
        return progress
    }
    getPercentage(){
        return parseInt((this.props.done/this.props.total)*100)
    }
    render(){
        var totalProgress;
        var percentage;
        totalProgress = <div>[{this.getProgress()}]</div>
        console.log(totalProgress);
        percentage = <div>{this.getPercentage()}%</div>
        console.log(percentage);
        return(
            <div>
                {totalProgress}
                {percentage}
            </div>);
    }
}

export default ProgressBar;