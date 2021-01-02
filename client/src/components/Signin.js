import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {setAuthentication, isAuthenticated} from '../helpers/auth';
import M from 'materialize-css';

const Signin = () => {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const PostData = () => {
    fetch('/signin', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password,
        email,
      })
    }).then(res => res.json())
    .then(data => {
      // console.log(data)
      if(data.errorMessage){
        M.toast({html: data.errorMessage, classes: "#e53935 red darken-1"})
      }
      else {
        console.log(data.token, data.user)
        localStorage.setItem('jwt', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setAuthentication(data.token, data.user);
        M.toast({html: "Sign In Successful", classes:"#43a047 green darken-1"})
        //We can chain role property to isAuthenticated() bc when we created isAuthenticated, we are returning getLocalStorage which is returning the user object, so we have access to it.
        if (isAuthenticated() && isAuthenticated().role === 1){
          console.log(`Redirect to Admin Dashboard`);
          history.push('/admin')
        } else {
          console.log(isAuthenticated().role)
          console.log(`Redirect to User dashboard`);
          history.push('/user');
        }
    }
    }).catch(error => {
      console.log(error)
    })
  }
  return (
    <div className="mycard">
      <div className="card auth-card input-field ">
        <h2>Instagram</h2>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button className="waves-effect waves-light btn #64b5f6 blue darken-1" onClick={()=> PostData()}>Sign-in</button>
        <h5>
          <Link to='/signin'>Dont have an account?</Link>
        </h5>
      </div>
    </div>
  )
};

export default Signin;