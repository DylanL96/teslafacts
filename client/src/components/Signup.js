import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const PostData = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
      return
  }
    fetch('/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        email,
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.errorMessage){
        M.toast({html: data.errorMessage, classes: "#e53935 red darken-1"})
      }
      else {
        M.toast({html: data.successMessage, classes:"#43a047 green darken-1"})
        history.push('/signin')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="mycard">
      <div className="card auth-card input-field ">
        <h2>Instagram</h2>
        <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button className="waves-effect waves-light btn #64b5f6 blue darken-1" onClick={() => PostData()}>Sign-up</button>
        <h5>
          <Link to='/signin'>Already have an account?</Link>
        </h5>
      </div>
    </div>
  )
};

export default Signup;