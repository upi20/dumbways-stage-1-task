module.exports = (req, res) => {
  res.render("contact", {
    isLogin: req.session.isLogin,
    loginUser: req.session.authUser,
  });
};
