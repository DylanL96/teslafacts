import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import AdminRoute from './components/AdminRoute';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Navbar from './components/Navbar';
// import User from './components/User';
import RegisteredRoute from './components/RegisteredRoute';
import CreatePost from './components/CreatePost';
import Blogs from './components/Blogs';
import SpecificPost from './components/SpecificPost';
import './App.css';

const App = () => {
  return(
    <>
    <Navbar/>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/signin' component={Signin}/>
      <RegisteredRoute exact path='/blog/posts/:id' component={SpecificPost}/>
      <RegisteredRoute exact path='/blog' component={Blogs}/>
      <AdminRoute exact path='/admin' component={Admin}/>
      <AdminRoute exact path='/admin/blog/create' component={CreatePost}/>
      {/* <UserRoute exact path='/user' component={User}/> */}
    </Switch>
    </>
  )
}

export default App;
