const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('base.pug');
});

router.get('/login', (req, res) => {
  res.status(200).render('login.pug');
});
module.exports = router;
