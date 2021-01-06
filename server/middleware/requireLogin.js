const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/database');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
  const {authorization} = req.headers
  const token = authorization.replace("Bearer ", "")
  jwt.verify(token, JWT_SECRET, (error, payload) => {
    if(error){
      return res.status(401).json({error: "You must be registered to view this section!"})
    }
    const {_id} = payload;
    User.findById(payload.user._id)
      .then(userdata => {
        req.user = userdata;
        next()
      })
  })
}