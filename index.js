const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");

// import controller
const home = require("./src/controller/home");
const testimonial = require("./src/controller/testimonial");
const contact = require("./src/controller/contact");

// project controller
const {
  add: addProject,
  store: storeProject,
  view: viewProject,
  delete: deleteProject,
  edit: editProject,
  update: updateProject,
} = require("./src/controller/project");

const { loginView, registerView, registerSend, loginCheck, logOut } = require("./src/controller/auth");

// session
const session = require("express-session");

// setup server
const app = express();
const PORT = process.env.PORT || 5000;

// setup to call hbs
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// Use the express-fileupload middleware
app.use(fileUpload());

// set static file server
app.use(express.static("src/assets"));

// parsing data from client
app.use(express.urlencoded({ extended: false }));

// setup session
app.use(
  session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 2,
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: "100319",
  })
);

// routing
app.get("/", home);
app.get("/testimonial", testimonial);
app.get("/contact", contact);

// project
app.get("/project/add", addProject);
app.post("/project/add", storeProject);
app.get("/project/:id", viewProject);
app.get("/project/:id/delete", deleteProject);
app.get("/project/:id/edit", editProject);
app.post("/project/:id/edit", updateProject);

// login
app.get("/login", loginView);
app.post("/login", loginCheck);
app.get("/register", registerView);
app.post("/register", registerSend);
app.get("/logout", logOut);

// // example render template html without template engine
// app.get("/testes", (req, res) => {
//     const filePath = path.resolve(__dirname, "src/views/testimonial.html");
//     res.sendFile(filePath);
// });

// local server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
