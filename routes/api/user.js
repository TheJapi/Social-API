const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar'); 
const bcrypt = require('bcryptjs');
const db = require('../../DBConnection')

router.get('/:id', (req, res) => {
    res.json({ hello : 'world'});
});

router.post('/register', (req, res) => {
    db.connect();

    //mongoose method for finding one register
    User.findOne
    ({email: 'req.body.email'})
    .then(user => { 
        if (user){
            return res.status(400).json({email: 'Email in use'});
        }
        //if mail doesn't exists, create it using mongo object
        else{
            const avatar = gravatar.url(req.body.email, {
                s: '200', //size
                r: 'pg', // rating
                d: 'mm' //default
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash) =>{
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user) && db.disconnect())
                    .catch(err => console.log(err)); 
                    
                });
            });
        }
    })
    .catch(err => console.log(err));
    
});

module.exports = router;
