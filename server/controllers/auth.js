//Importing packages and other files
const User = require('../models/User');
const { json } = require('express');

const signupController = (req, res) => {
  //Destructuring req.body
  const {username, email, password} = req.body;
  console.log(username, email, password)
  
  //If there is no username, email or password, return json errorMessage
  if(!username || !email || !password){
    return res.status(422).json({errorMessage: 'Please add all of the fields'})
  } 
  //Checks the mongoDB and determines whether a user has already signed up with that email
  User.findOne({email: email})
    .then((savedUser) => {
      if(savedUser){
        return res.status(422).json({errorMessage: 'User already exists with that email'})
      }
      const user = new User({
        username:username,
        email:email,
        password:password
      })
      user.save()
        .then(user => {
          res.json({successMessage: 'User Saved'})
        })

    })
};


module.exports = {
  signupController,
}