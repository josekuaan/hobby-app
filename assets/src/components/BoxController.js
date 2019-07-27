import React from "react"
import Register from "./Register";
import Login from "./Login";



export default class BoxController extends React.Component
{
    constructor(){
        super()
        this.state ={
          isLoginOpen:false,
          isRegisterOpen:true
    
        }
      }
      showLogin(){
        this.setState({
          isLoginOpen:true,
          isRegisterOpen:false
        })
      }

    showRegister(){
    
        this.setState({
          isRegisterOpen:true,
          isLoginOpen:false
        })
      }
    render(){
        return(
            <div className="box">
            <div className="box-controller">
              <div className={"controller "  +  (this.state.isLoginOpen ? 'controller-border' :'') } onClick={this.showLogin.bind(this)}>
                Login
              </div>
              <div className={"controller " +  (this.state.isRegisterOpen ? 'controller-border' :'') } onClick={this.showRegister.bind(this)}>
                 Register
              </div>
    
            </div>
            <div className="form-box">
             {this.state.isLoginOpen ? <Login /> :<Register />}
            </div>
          </div>
        )
    }
    
}

