import React from 'react';
import BoxController from "./components/BoxController";
import Home from "./pages/Home"
import Error from "./pages/Error"

import {Route,Switch} from "react-router-dom"

import "./form.css";

class App extends React.Component{

  constructor(){
    super()
    this.state ={
     

    }
  }


  render(){
    return(
      <>
      <Switch>
      <Route exact path="/" component={BoxController} />
      <Route exact path="/home/" component={Home}/>
      <Route exact path="/home/:id" component={"View"}/>
      <Route component={Error} />
      </Switch>
      </>
    )
  }
}

export default App
