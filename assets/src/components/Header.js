import React from "react"


export default class Header extends React.Component
{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
            <header>
            <nav className="navbar">
                <span className="navlogo"><h3>HOBBIES</h3></span>
                <div className="navitems">
                   <ul>
                      <li className="logout" onClick={()=>this.props.isLogout()}>Logout</li>
                      
                   </ul>
                </div>
            </nav>
        </header>
        )
    }
}

