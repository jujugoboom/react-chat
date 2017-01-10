import React, { Component } from 'react';

class ProgressBar extends Component{
    constructor(props){
        super(props);
        this.getProgress = this.getProgress.bind(this);
        this.getPercentage = this.getPercentage.bind(this);
    }
    getProgress(){
        let amount = parseInt(((this.props.done/this.props.total)*100) % 10);
        let symbol = '#';
        return symbol.repeat(amount);
    }
    getPercentage(){
        return parseInt((this.props.done/this.props.total)*100)
    }
    render(){
        var totalProgress;
        var percentage;
        totalProgress = <div>{this.getProgress()}</div>
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