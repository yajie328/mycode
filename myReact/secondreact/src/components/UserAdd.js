import React, { Component } from 'react';
export default class UserAdd extends Component{
    constructor(){
        super();
        this.usernameRef = React.createRef();
        this.emailRef = React.createRef();
    }
    render(){
        handleSubmit =(event)=>{
                event.preventDefault;
                let username = this.usernameRef.current.value;
                let email = this.emailRef.current.value;
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="" className="control-label" ref={this.usernameRef}>用户名</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="control-label" ref={this.emailRef}>邮箱</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <input type="button" value="提交"/>
                    </div>
                </form>

            </div>
        )
    }
}
