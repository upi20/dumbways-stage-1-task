const fs = require("fs");
const path = require("path");
const { getProjectsData, saveProjectsData } = require("../mocks/projects");
const durationCalculate = require("../helper/duration-calculate");
const { Technology } = require("../database/models");
const technologies = require("../mocks/technologies");

const formatDate = (date = "") => {
  date = new Date(date);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return [date.getDate(), months[date.getMonth()], date.getFullYear()].join(" ");
};

const techParse = (techs = []) => {
  const results = [];
  techs.forEach((id) => {
    const find = technologies.find((e) => e.id == id);
    if (find) results.push(find);
  });
  return results;
};

module.exports = {
  view: (req, res) => {
    let project = getProjectsData().find((e) => e.id == req.params.id);

    // if project not found
    if (!project) return res.send(404);

    // if project found
    project.duration = durationCalculate(project.startDate, project.endDate);
    project.startDateStr = formatDate(project.startDate);
    project.endDateStr = formatDate(project.endDate);
    res.render("project-detail", { project });
  },

  add: async (req, res) => {
    const { alert, alertmessage } = req.query;
    const [alertSuccess, alertDanger, alertWarning] = [alert == 1, alert == 2, alert == 3];
    let technologies = [];
    try {
      // get data from database
      technologies = await Technology.findAll({ order: [["name", "ASC"]] });
    } catch (error) {
      return res.status(500).json(error);
    }

    let technologiesHtml = "";
    technologies.forEach((e) => {
      technologiesHtml += ` <div class="d-inline me-3 text-nowrap">
            <input type="checkbox" id="technologies-${e.id}" name="technologies[${e.id}]" data-id="${e.id}" class="form-check-input technologies">
            <label for="technologies-${e.id}" class="form-check-label">${e.name}</label>
        </div> `;
    });

    res.render("project", { technologiesHtml, alertSuccess, alertDanger, alertWarning, alertMessage: alertmessage });
  },

  edit: (req, res) => {
    let project = getProjectsData().find((e) => e.id == req.params.id);

    // if project not found
    if (!project) return res.send(404);

    // if project found
    const { alert, alertmessage } = req.query;
    let technologiesHtml = "";
    technologies.forEach((e) => {
      const checked = project.technologies.find((t) => t.id == e.id) ? "checked" : "";
      technologiesHtml += `
          <div class="d-inline me-3 text-nowrap">
              <input type="checkbox" id="technologies-${e.id}" name="technologies[${e.id}]" data-id="${e.id}" ${checked} class="form-check-input technologies">
              <label for="technologies-${e.id}" class="form-check-label">${e.name}</label>
          </div>
        `;
    });

    const alertSuccess = alert == 1;
    const alertDanger = alert == 2;
    const alertWarning = alert == 3;
    res.render("project", {
      technologiesHtml,
      alertSuccess,
      alertDanger,
      alertWarning,
      alertMessage: alertmessage,
      project,
    });
  },

  store: (req, res) => {
    // desctructur data
    const { name, description } = req.body;

    // id
    const projects = getProjectsData();
    let newId = 1;
    if (projects.length > 0) newId = projects[projects.length - 1].id + 1;

    // technologies
    const techLists = techParse(JSON.parse(req.body.technologies));
    if (techLists.length < 1) {
      return res.redirect("/project/add?alert=2&alertmessage=Technologies must be selected at least 1");
    }

    // upload image
    let imagePath = "";
    if (req.files) {
      const { image } = req.files;
      const rand = Math.round(Math.random() * 10000);
      imagePath = `/img/projects/${rand}-${image.name}`;
      const fullPath = path.join(__dirname, `/../assets/${imagePath}`);
      image.mv(fullPath);
    } else {
      return res.redirect("/project/add?alert=2&alertmessage=Images are required");
    }

    // insert data
    projects.push({
      id: newId,
      name,
      image: imagePath,
      technologies: techLists,
      startDate: req.body["start-date"],
      endDate: req.body["end-date"],
      description,
    });

    saveProjectsData(projects);

    return res.redirect("/project/add?alert=1&alertmessage=Data Successfully Saved");
  },

  update: (req, res) => {
    // desctructur data
    const { name, description } = req.body;
    const { id } = req.params;
    const projects = getProjectsData();

    // find data
    let project = projects.find((e) => e.id == id);

    // technologies
    const techLists = techParse(JSON.parse(req.body.technologies));
    if (techLists.length < 1) {
      return res.redirect(`/project/${id}/edit?alert=2&alertmessage=Technologies must be selected at least 1`);
    }

    // edit project
    project.name = name;
    project.technologies = techLists;
    project.startDate = req.body["start-date"];
    project.endDate = req.body["end-date"];
    project.description = description;

    // upload image
    if (req.files) {
      let imagePath = "";
      const oldImage = project.image;
      const { image } = req.files;
      const rand = Math.round(Math.random() * 10000);
      imagePath = `/img/projects/${rand}-${image.name}`;
      const fullPath = path.join(__dirname, `/../assets/${imagePath}`);
      image.mv(fullPath);
      project.image = imagePath;

      // delete image
      try {
        const oldImagePath = path.join(__dirname, `/../assets/${oldImage}`);
        fs.unlinkSync(oldImagePath);
        console.log(`Delete File successfully. ${oldImagePath}`);
      } catch (error) {
        console.log(error);
      }
      console.log("data updated");
    }

    // insert data
    const index = projects.findIndex((e) => e.id == id);
    projects[index] = project;
    saveProjectsData(projects);

    res.redirect(`/project/${id}/edit?alert=1&alertmessage=Data Successfully Edited`);
  },

  delete: (req, res) => {
    // desctructur data
    const { id } = req.params;
    let projects = getProjectsData();

    // find data
    let project = projects.find((e) => e.id == id);
    // if project not found
    if (!project) return res.send(404);

    // delete image
    try {
      const oldImagePath = path.join(__dirname, `/../assets/${project.image}`);
      fs.unlinkSync(oldImagePath);
      console.log(`Delete File successfully. ${oldImagePath}`);
    } catch (error) {
      console.log(error);
    }
    projects = projects.filter((e) => e.id != id);
    saveProjectsData(projects);

    res.redirect(`/?alert=1&alertmessage=Data Successfully Deleted`);
  },
};
