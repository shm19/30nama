module.exports.login = (req, res) => {
  res.status(200).render('login.pug', { title: 'Login' });
};
