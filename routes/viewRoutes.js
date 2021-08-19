const express = require('express');

const router = express.Router();

router.get('/welcome', (req, res) => {
  res.render('base.pug');
});
module.exports = router;
