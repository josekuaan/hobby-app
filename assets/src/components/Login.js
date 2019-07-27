import React from "react"
import {Redirect} from "react-router-dom"




export default class Login extends React.Component
{
  constructor(){
    super()
    this.state ={
      email:"",
      password:"",
      redirect:false,
      errors:[],
      
    }
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
  handelSubmitLogin(event){
    
          event.preventDefault()
          if(this.state.email === ""){
            this.showValidationErr("email", "Email cannot be empty")
          } if(this.state.password ===""){
            this.showValidationErr("password", "Password cannot be empty")
          }

          const data ={
            email:this.state.email,
            password:this.state.password
          }
          
          const jsonString = JSON.stringify(data)
    
          fetch("http://localhost:1337/api/login",{
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

    let emailErr = null, passwordErr= null
    for(let err of this.state.errors){
      if(err.elm ==="email"){
        emailErr = err.msg
      }
      if(err.elm === "password"){
        passwordErr = err.msg
      }
    }

  
    return(
      <>
       {this.state.redirect ? <Redirect to="/home" /> : "" }
      <div className="">
            <div className="RegTitle">
            Login
            </div>
            <form className="form-group" onSubmit={this.handelSubmitLogin.bind(this)}>
            <div className="">
                <label htmlFor="email" >Email</label>
                <input type="text" name="email" className="form-control" 
                placeholder="Email" 
                onChange={this.HandelChange.bind(this)}/>
                <small className="danger-text">{emailErr  ? emailErr :"" }</small>
            </div>
            
            <div className="">
                <label htmlFor="password" >Password</label>
                <input type="password" name="password" className="form-control" 
                placeholder="password " 
                onChange={this.HandelChange.bind(this)} />
                <small className="danger-text">{passwordErr ? passwordErr :""}</small>
            </div>
            
            <div className="">
            <button className="btn-primary">Login</button>
            <p>Don't have an account yet? <span className="loginLink" >Register</span></p>
            </div>
            
            </form>
      </div>
      </>
    )
  }
}
