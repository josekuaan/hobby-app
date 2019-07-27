import React, { Component } from 'react'

const RegisterContext = React.createContext();
 class FormProvider extends Component {
     constructor(props){
         super(props)
         this.state ={
            username:"",
            email:"",
            password:"",
            userID: ""
         }
       
     }

     
   

    render() {
       
        
        
        return (
            <RegisterContext.Provider value={{...this.props.userID}} >
                {this.props.children}
                
            </RegisterContext.Provider>
        )
    }
}

const FormContext = RegisterContext.Consumer;


export {FormProvider,FormContext,RegisterContext}
