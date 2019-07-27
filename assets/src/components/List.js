import React from "react"


export default class List extends React.Component
{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        console.log(this.props.hobby.id)
        return(
            <div className="section-hobby">
            
                <div className="items">
                   <span>{this.props.hobby.text}</span>
                   <span className="deleteHobby" onClick={()=>this.props.handleDelete(this.props.hobby.id)}> delete</span>
                </div>
           
        </div>
        )
    }
}

