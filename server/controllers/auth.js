//Importing packages and other files
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/database');

//Creating the sign up controller on the backend
const signupController = (req, res) => {
  //Destructuring req.body
  const {username, email, password} = req.body;
  // console.log(username, email, password)
  
  //If there is no username, email or password, return json errorMessage
  if(!username || !email || !password){
    return res.status(422).json({errorMessage: 'Please add all of the fields'})
  } 
  //Checks the mongoDB and determines whether a user has already signed up with that email
  User.findOne({email: email})
    .then((savedUser) => {
      if(savedUser){
        return res.status(422).json({errorMessage: 'User already exists with that email'})
      } else {
      //Hashing the password to make it secure
      bcrypt.hash(password, 12)
        .then(hashedPassword => {
          // console.log(hashedPassword)

          //Creating a new user based on the User Schema Model
          const user = new User({
            username: username,
            email: email,
            password: hashedPassword
          })
          //Saving the newly created user in mongoDB
          user.save()
            .then(user => {
              res.json({successMessage: 'User saved successfully'})
            })
            .catch(error => {
              console.log(error)
            })
        })
      }
    })
    //Catch error for the User.findOne
    .catch(error => {
      console.log(error)
    })

};

//Creating the sign in controller on the backend
const signinController = (req, res) => {
  const {email, password} = req.body;
  // console.log(req.body, email, password)
  //If missing email or password, return error message
  if(!email || !password){
    return res.status(422).json({errorMessage: 'Invalid Credentials'})
  } else {
    //Checks the mongoDB and determines whether a user has already signed up with that email
    User.findOne({email: email})
      .then(savedUser => {
        //If there is no user with that specific email, returns error message
        if(!savedUser){
          return res.status(422).json({errorMessage:"Invalid Credentials"})
        } else {
          //Compares the password entered with the hashed password in savedUser
          bcrypt.compare(password, savedUser.password)
            .then(itMatches => {
              // console.log(itMatches)
              if(itMatches){

                //Creating payload for the jwt token
                const payload = {
                  user: {
                    _id: savedUser._id
                  }
                };

                //Creating the JWT token
                const token = jwt.sign(payload, JWT_SECRET);
                //Destructuring the savedUser data
                const {_id, username, email, role} = savedUser;
                //Sending back the user with all of the info we destructured
                res.json({token: token, user:{_id, username, email, role}})
              } else {
                return res.status(422).json({errorMessage: "Invalid Credentials"})
              }
            })
        }
      })
      .catch(error => {
        console.log(error)
      });
  }
};

module.exports = {
  signupController,
  signinController
};