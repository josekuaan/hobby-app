import React from 'react'
import Hobby from "../components/Hobby"


export default class Home extends React.Component
 {
     constructor(){
         super()
         this.state={
             data:null
         }
     }

    //  componentDidMount(){
    //      fetch("/api/hobby").then(data =>{
    //         return data.json();
            
    //      }).then( (json)=>{
    //         //  console.log(json)
    //          this.setState({data:json.data})
    //      })

         
    //  }
     render(){
        return (
            <div>
                <Hobby />
            </div>
        )
     }
    
}


