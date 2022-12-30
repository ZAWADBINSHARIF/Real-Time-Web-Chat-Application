// for get values of .env file and use it!!
require('dotenv').config();

// external imports
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');

// internal imports
const connectDB = require('./config/dataBaseConnection');
const loginRoute = require('./routers/loginRoute');
const indexRoute = require('./routers/indexRoute')
const usersRoute = require('./routers/usersRoute') 
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');

const PORT = process.env.PORT;

// json parser
app.use(express.json());

// url parser
app.use(express.urlencoded({extended: true}));

// cookie parser middleware
app.use(cookieParser());

// connect to database
connectDB();

// set view engine
app.set('view engine', 'ejs');

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// route setup
app.use('/login', loginRoute);
app.use('/users', usersRoute);
app.use('/index', indexRoute);

// 404 error page
app.use(notFoundHandler);
 
// common error handler
app.use(errorHandler);

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Application listening on PORT : http://localhost:${PORT}`);
    });
    
    console.log('Database Connection is successfully');
});