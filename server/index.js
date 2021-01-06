//Requiring our modules
const express = require('express');
const app = express();
const PORT = 2000;
const mongoose = require('mongoose');
const {mongoDBURL} = require('./config/database');
//Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const blogRoute = require('./routes/blogRoutes');

//Middleware
//This is a type of middleware for POST and PUT requests that is necessary because we are sending data in the form of some data object to the server and asking the server to accept or store that data which is enclosed in the body (i.e. req.body) of that POST or PUT request
app.use(express.json())

//Connecting to mongoDB
mongoose.connect(mongoDBURL,
  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then((result) => app.listen(PORT, console.log(`Server started on port ${PORT}. MongoDB is connected as well.`)))
    .catch((err) => {console.log(err)});

//Connecting to routes
app.use('/', authRoutes);
app.use('/admin', adminRoutes);
app.use('/blog', blogRoute);

