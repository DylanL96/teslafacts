//Requiring our modules
const express = require('express');
const app = express();
const PORT = 2000;
const mongoose = require('mongoose');
const {mongoDBURL} = require('./config/database');

//Connect to mongo
mongoose.connect(mongoDBURL,
  {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(PORT, console.log(`Server started on port ${PORT}. MongoDB is connected as well.`)))
    .catch((err) => {console.log(err)});

app.get('/', (req, res) => {
  res.send('Server Started')
})

