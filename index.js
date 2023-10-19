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

const { loginView } = require("./src/controller/auth");

// auth and session
const bcrypt = require("bcrypt");
const flash = require("express-flash");
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
    cookie: { secure: true, httpOnly: true, maxAge: 1000 * 60 * 60 * 2 },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: "100319",
  })
);
app.use(flash());

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

app.get("/tes", async function (req, res) {
  const pass = "12345678";
  // encryption
  await bcrypt.hash(pass, 10, function (err, hash) {
    // check
    const check = bcrypt.compareSync(pass, hash);
    console.log(check);
    console.log(hash);

    // set cookie
  });

  return res.send(200);
});

// // example render template html without template engine
// app.get("/testes", (req, res) => {
//     const filePath = path.resolve(__dirname, "src/views/testimonial.html");
//     res.sendFile(filePath);
// });

// local server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
