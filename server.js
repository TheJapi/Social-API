const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Port for heroku
const port = process.env.PORT || 8080;

//Keys for db connection
const db = require('./config/keys').mongoURI;

//dbconnection (then called if con is successful )
const connection = () => {
    mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('Connection to db successful'))
    .catch((err) => console.log(err));
}
//Middlewares

//Routes
const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

app.use('/api', user);
app.use('/api', profile);
app.use('/api', post);


//Server init
app.listen(port, () => {
    console.log(`connected on ${ port }`);
});
