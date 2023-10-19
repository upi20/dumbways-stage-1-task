const bcrypt = require("bcrypt");
const { User } = require("../database/models");

module.exports = {
  loginView: (req, res) => {
    // if login redirect to home
    if (req.session.isLogin) return res.redirect("/");

    // if project found
    const { alert, alertmessage, email, password } = req.query;

    // render with params
    const [alertSuccess, alertDanger, alertWarning] = [alert == 1, alert == 2, alert == 3];

    res.render("login", { alertSuccess, alertDanger, alertWarning, alertMessage: alertmessage, email, password });
  },
  registerView: (req, res) => {
    // if login redirect to home
    if (req.session.isLogin) return res.redirect("/");

    const { alert, alertmessage, name, email } = req.query;

    // render with params
    const [alertSuccess, alertDanger, alertWarning] = [alert == 1, alert == 2, alert == 3];
    res.render("register", { alertSuccess, alertDanger, alertWarning, alertMessage: alertmessage, name, email });
  },
  registerSend: async (req, res) => {
    try {
      // destructur request body
      const { name, email, password } = req.body;

      // check user
      const user = await User.findOne({ where: { email } });
      if (user) return res.redirect(`/register?alert=2&alertmessage=Email Already Used&email=${email}&name=${name}`);

      // hash password
      await bcrypt.hash(password, 10, (err, hashPassword) => {
        // insert user
        User.create({ name, email, password: hashPassword });
      });
      return res.redirect(`/login?alert=1&alertmessage=User registered&email=${email}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  loginCheck: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      // check user exists
      if (!user) return res.redirect(`/login?alert=2&alertmessage=User has not been registered&email=${email}`);

      await bcrypt.compare(password, user.password, (err, result) => {
        // if not valid
        if (!result) return res.redirect(`/login?alert=2&alertmessage=Password wrong&email=${email}`);
        req.session.isLogin = true;
        req.session.authUser = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        return res.redirect(`/?alert=1&alertmessage=Login success`);
      });
    } catch (err) {
      throw err;
    }
  },

  logOut: (req, res) => {
    // set null session
    req.session.isLogin = false;
    req.session.authUser = null;

    return res.redirect("/login?alert=1&alertmessage=Logout Success");
  },
};
