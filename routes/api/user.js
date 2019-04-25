const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    res.json({ hello : 'world'});
});

module.exports = router;
