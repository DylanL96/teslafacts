import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  return(
    <>
    <Navbar/>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/signin' component={Signin}/>
      <Route exact path='/admin' component={Admin}/>
    </Switch>
    </>
  )
}

export default App;
