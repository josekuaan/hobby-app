import React from "react"
import {Redirect} from "react-router-dom"
import {FormProvider} from "../context"


export default class Register extends React.Component
{
  constructor(){
    super()
    this.state ={
      username:"",
      email:"",
      password:"",
      number:"",
      redirect:false,
      isLoginOpen:false,
      isRegisterOpen:true,
      errors:[],
      userData: null
    }
    this.handelSubmitRegister = this.handelSubmitRegister.bind(this)
  }

  showValidationErr(elm,msg){
    this.setState((prevState)=>( {errors: [...prevState.errors,{elm,msg}] }))
  }
  clearValidationError(elm){

    this.setState((prevState)=>{
      let newArr=[];
      for(let err of prevState.errors){
        if( elm !== err.elm){
          newArr.push(err)
        }
        
      }
      return {errors:newArr}
    })
  }

  HandelChange(event){
    const {name,value} = event.target
    this.setState({
     [name]:value
    })
    this.clearValidationError(name)
  }

  
  handelSubmitRegister(event){

    event.preventDefault();
      if(this.state.username === ""){
         this.showValidationErr("username", "User Name cannot be empty")
      } if(this.state.email ===""){
         this.showValidationErr("email", "Email cannot be empty")
      } if(this.state.password ===""){
         this.showValidationErr("password", "Password cannot be empty")
      } if(this.state.number ===""){
        this.showValidationErr("number", "Number cannot be empty")
        }
      const data ={
        username:this.state.username,
        email:this.state.email,
        password:this.state.password,
        number:this.state.number
      }
      
      const jsonString = JSON.stringify(data)

      let isDev = /localhost/.test(window.location.origin),
      base_url = isDev ? "http://localhost:1337" : window.location.origin;
// http://localhost:1337  
      fetch(`${base_url}/api/signup`,{
        method:"POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',  
        },
        body:jsonString
      }).then(res => res.json())
      .then(data =>{
        console.log(data)
        if(data.success === true){
          //saving data in local storage
           localStorage.setItem('userData',JSON.stringify(data.userData))
           this.setState({ redirect:true})
          
        }
      })
      .catch((err)=>{console.log(err) })

      

  }
  
 
  render(){
    
    
    let usernameErr=null, emailErr=null, passwordErr=null, numberErr=null

    for(let err of this.state.errors){
      if(err.elm === "username"){
        usernameErr = err.msg
      }
      if(err.elm === "email"){
        emailErr = err.msg
      }
      if(err.elm === "password"){
        passwordErr = err.msg
      }
      if(err.elm === "number"){
        numberErr = err.msg
      }

      
    }
    return(
      <>
     <FormProvider userID={this.state.userID}/>
      
      {this.state.redirect ? <Redirect to="/home" /> : <Redirect to="/" /> }
      
      
      <div className="">
            <div className="RegTitle">
            Register
            </div>
            <form className="form-field"  onSubmit={this.handelSubmitRegister}>
            <div className="">
                <label htmlFor="username" >User Name</label>
                <input type="text" name="username" value={this.state.username} className="form-control" 
                placeholder="User name" 
                onChange={this.HandelChange.bind(this)}/>
                <small className="danger-text">{usernameErr  ? usernameErr :"" }</small>
            </div>
            <div className="">
                <label htmlFor="email" >Email</label>
                <input type="text" name="email" value={this.state.email}className="form-control" 
                placeholder="Email"
                onChange={this.HandelChange.bind(this)} />
                <small className="danger-text">{emailErr  ? emailErr :"" }</small>
            </div>
            <div className="">
                <label htmlFor="password" >Password</label>
                <input type="password" name="password" value={this.state.password} className="form-control" 
                placeholder="password " 
                onChange={this.HandelChange.bind(this)} />
                <small className="danger-text">{passwordErr ? passwordErr :""}</small>
            </div>
            <div className="">
                <label htmlFor="number" >Number</label>
                <input type="text" name="number" value={this.state.number} className="form-control" 
                placeholder="number " 
                onChange={this.HandelChange.bind(this)} />
                <small className="danger-text">{numberErr ? numberErr :""}</small>
            </div>
            
            <div className="">
            <button className="btn-primary">Register</button>
            <p>Already have an account? <span className="loginLink" >Login</span></p>
            </div>
            
            </form>
      </div>
      </>
    )
  }
}
