const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Port for heroku
const port = process.env.PORT || 8080;

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes
const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/post', post);

//Server init
app.listen(port, () => {
    console.log(`connected on ${ port }`);
});
