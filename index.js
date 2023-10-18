const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");

// import controller
const home = require("./src/controller/home");
const testimonial = require("./src/controller/testimonial");
const contact = require("./src/controller/contact");
const addProject = require("./src/controller/project/add");
const storeProject = require("./src/controller/project/store");
const viewProject = require("./src/controller/project/view");
const editProject = require("./src/controller/project/edit");
const updateProject = require("./src/controller/project/update");
const deleteProject = require("./src/controller/project/delete");

const { Technology } = require("./src/database/models");

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

app.get("/tes", async function (req, res) {
  const get = await Technology.findAll();
  console.log(get);
  res.send(200);
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
