import React, { Component } from 'react'
import {RegisterContext} from '../context'
import {Redirect} from "react-router-dom"
import Header from "./Header"
import List from "./List"

import "../App.css"

export default class Hobby extends Component {
    constructor(){
        super()
        this.state ={
            value:"",
            userID:"",
            email:"",
            number:"",
            redirect:false,
            hobbies:[]
            }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.HandelChange = this.HandelChange.bind(this)
    this.isLogout = this.isLogout.bind(this)
    this.handleDelete =this.handleDelete.bind(this)
    }

    componentDidMount(){

        const localData = localStorage.getItem("userData")
        //  if( localData === null ){
        //     return this.setState({ redirect:true}) 
        //  }
          
          
console.log(localData)
        const parsedData = JSON.parse(localData)
        this.setState({
            userID : parsedData.id,
            email:parsedData.email,
            number:parsedData.number
        })
        
        fetch("http://localhost:1337/api/hobby", {
            headers: {'Content-Type': 'application/json'}
            }).then((json)=>{
            return json.json()
        }).then((data)=>{
            console.log(data.data)
            this.setState({
                hobbies:data.data
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    

    HandelChange(event){
        const {name,value} = event.target
        this.setState({
         [name]:value
        })
    }
   
    handleSubmit(event){
        event.preventDefault();
          
      const data ={
          text : this.state.value,
          userID : this.state.userID,
          number:this.state.number,
          email:this.state.email
      }

      console.log(data)
      const obj =JSON.stringify(data)
     

      fetch("http://localhost:1337/api/hobby",{
          method:"POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body:obj
        }).then(response =>  response.json())
        .then(data =>{
            console.log(data)
            this.setState({hobbies: this.state.hobbies.concat(data.data)})
        })
        .catch((err)=>{console.log(err) })
      

    }

    isLogout(){
        console.log("ok")
          localStorage.clear()
        this.setState({ redirect:true})
    }
    handleDelete(id){
    console.log("ok")
     fetch("http://localhost:1337/api/delete/" + id,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
     } ).then((res)=>{
  console.log(res)
     })
    //  add https://cors-anywhere.herokuapp.com 
     
     fetch("http://localhost:1337/api/hobby",
     {
     headers: {'Content-Type': 'application/json'}
     }).then((json)=>{
        return json.json()
    }).then((data)=>{
        console.log(data)
        this.setState({
            hobbies:data.data  
        })
        
    }).catch((err)=>{
        console.log(err)
    })
    window.location.reload()
    }
    // static contextType = RegisterContext;
    render() {
        console.log(this.state.hobbies)
    
        const fromHobby = this.state.hobbies.filter((hobby)=>{
           
            return hobby.userID === this.state.userID
        })
        console.log(fromHobby)
        const filtered = fromHobby.map((hobby,index)=>{
            return <List key={index} hobby={hobby} handleDelete ={this.handleDelete}/>
        })
        
        if(filtered.length === 0){
            return (
                <>
                {this.state.redirect ? <Redirect to="/" /> : "" }
               <Header isLogout ={this.isLogout}/>
                <div className="section-1">
                    <section className="content">
                        <h4>What Gives You Fulfilment when you do them ?</h4>
                    <div className="section-div">
                        <div className="no-hobby">
                            <p>You don't have a hobby yet</p>
                        </div>
    
                        <div className="form-input">
                            <form className="hobby-form-group" onSubmit={this.handleSubmit}>
                                <div className="field-input">
                                <textarea type="text" name="value"  className="form-control" placeholder="(eg. dancing,singing,coding)"  onChange={this.HandelChange}></textarea>                               
                                </div>
                                <div className="">
                                   <button className="btn-primary">Add</button>
                                 </div>
                                
                            </form>
                        </div>
                    </div>
                    
                    </section>
                </div>
                
                </>
            )

        }else{
            return (
                <>
                {this.state.redirect ? <Redirect to="/" /> : "" }
               <Header isLogout ={this.isLogout}/>
                <div className="section-1">
                    <section className="content">
                        <div className="headding">
                        <h4>What Gives You Fulfilment when you do them ?</h4>
                        </div>
                        
                    <div className="section-div">
                       <div className="holder">
                            {filtered}
                       </div>
    
                       <div className="form-input">
                            <form className="hobby-form-group" onSubmit={this.handleSubmit}>
                                <div className="field-input">
                                <textarea type="text" name="value"  className="form-control" placeholder="(eg. dancing,singing,coding)"  onChange={this.HandelChange}></textarea>                               
                                </div>
                                <div className="">
                                   <button className="btn-primary">Add</button>
                                 </div>
                                
                            </form>
                        </div>
                    </div>
                    
                    </section>
                </div>
                
                </>
            )
        }
        
    }
}
