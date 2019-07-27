import React from "react"


 class RegisterForm extends React.Component{

    render(){
        return(
            <div className="form-controller">
            <div className="RegTitle">
            Register
            </div>
            <form className="form-group">
            <div className="input-group">
                <label htmlFor="username" >User Name</label>
                <input type="text" name="username" className="form-control" 
                placeholder="User name" 
                onChange={this.HandelChange.bind(this)}/><br />
                <small className="danger-text">{this.props.usernameErr  ? this.props.usernameErr :"" }</small>
            </div>
            <div className="input-group">
                <label htmlFor="email" >Email</label>
                <input type="text" name="email" className="form-control" 
                placeholder="Email"
                onChange={this.HandelChange.bind(this)} /><br />
                <small className="danger-text">{this.props.emailErr  ? this.props.emailErr :"" }</small>
            </div>
            <div className="input-group">
                <label htmlFor="password" >Password</label>
                <input type="password" name="password" className="form-control" 
                placeholder="password " 
                onChange={this.HandelChange.bind(this)} /><br />
                <small className="danger-text">{this.props.passwordErr ? this.props.passwordErr :""}</small>
            </div>
            <div>
                <div className=" weak pwd-weak"></div>
                <div className=" medium pwd-medium"></div>
                <div className=" strong pwd-strong"></div>
            </div>
            <div className="input-group">
            <button onClick={this.handelSubmitRegister.bind(this)}>Register</button>
            </div>
            
            </form>
      </div>
        )
    }
}

class LoginForm extends React.Component
{

    render(){
        return(
            <div className="form-controller">
            <div className="RegTitle">
            Login
            </div>
            <form className="form-group">
            <div className="input-group">
                <label htmlFor="username" >User Name</label>
                <input type="text" name="username" className="form-control" 
                placeholder="User name" 
                onChange={this.HandelChange.bind(this)}/><br />
                <small className="danger-text">{this.props.usernameErr  ? this.props.usernameErr :"" }</small>
            </div>
            
            <div className="input-group">
                <label htmlFor="password" >Password</label>
                <input type="password" name="password" className="form-control" 
                placeholder="password " 
                onChange={this.HandelChange.bind(this)} /><br />
                <small className="danger-text">{this.props.passwordErr ? this.props.passwordErr :""}</small>
            </div>
            <div>
                <div className=" weak pwd-weak"></div>
                <div className=" medium pwd-medium"></div>
                <div className=" strong pwd-strong"></div>
            </div>
            <div className="input-group">
            <button onClick={this.handelSubmitRegister.bind(this)}>Register</button>
            </div>
            
            </form>
      </div>
        )
    }
}

export  {RegisterForm,LoginForm}