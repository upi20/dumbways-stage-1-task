const fs = require("fs");
const path = require("path");
const durationCalculate = require("../helper/duration-calculate");
const { Technology, Project, ProjectTechnology } = require("../database/models");
const sequelize = require("../helper/sequelize");

const formatDate = (date = "") => {
  date = new Date(date);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return [date.getDate(), months[date.getMonth()], date.getFullYear()].join(" ");
};

const formatDateInput = (date = "") => {
  const addZero = (n) => (n < 10 ? `0${n}` : n);
  date = new Date(date);
  return [date.getFullYear(), addZero(date.getMonth() + 1), addZero(date.getDate())].join("-");
};

module.exports = {
  view: async (req, res) => {
    const { id } = req.params;
    // get by id
    const project = await Project.findOne({
      where: { id },
      include: { model: ProjectTechnology, include: { model: Technology } },
    });

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
    const technologies = await Technology.findAll({ order: [["name", "ASC"]] });

    let technologiesHtml = "";
    technologies.forEach((e) => {
      technologiesHtml += ` <div class="d-inline me-3 text-nowrap">
            <input type="checkbox" id="technologies-${e.id}" name="technologies[${e.id}]" data-id="${e.id}" class="form-check-input technologies">
            <label for="technologies-${e.id}" class="form-check-label">${e.name}</label>
        </div> `;
    });

    res.render("project", { technologiesHtml, alertSuccess, alertDanger, alertWarning, alertMessage: alertmessage });
  },

  edit: async (req, res) => {
    const { id } = req.params;
    // get by id
    const project = await Project.findOne({
      where: { id },
      include: { model: ProjectTechnology },
    });

    // if project not found
    if (!project) return res.send(404);

    // fix format date input
    project.startDateInput = formatDateInput(project.startDate); // 2023-01-01T00:00:00.000Z -> 2023-01-01
    project.endDateInput = formatDateInput(project.endDate);

    // get all technologies
    const technologies = await Technology.findAll({ order: [["name", "DESC"]] });

    // if project found
    const { alert, alertmessage } = req.query;
    let technologiesHtml = "";
    technologies.forEach((e) => {
      const checked = project.ProjectTechnologies.find((t) => t.technologyId == e.id) ? "checked" : "";
      technologiesHtml += `
          <div class="d-inline me-3 text-nowrap">
              <input type="checkbox" id="technologies-${e.id}" name="technologies[${e.id}]" data-id="${e.id}" ${checked} class="form-check-input technologies">
              <label for="technologies-${e.id}" class="form-check-label">${e.name}</label>
          </div>
        `;
    });

    // render with params
    const [alertSuccess, alertDanger, alertWarning] = [alert == 1, alert == 2, alert == 3];
    res.render("project", {
      technologiesHtml,
      alertSuccess,
      alertDanger,
      alertWarning,
      alertMessage: alertmessage,
      project,
    });
  },

  store: async (req, res) => {
    // desctructur data
    const { name, description } = req.body;

    // technologies
    const techLists = JSON.parse(req.body.technologies);
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

    // initial transaction
    const t = await sequelize.transaction();
    try {
      // Create a new project
      const project = await Project.create(
        {
          name,
          image: imagePath,
          startDate: req.body["start-date"],
          endDate: req.body["end-date"],
          description,
        },
        { transaction: t }
      );

      // insert technologies
      await ProjectTechnology.bulkCreate(
        techLists.map((e) => ({ projectId: project.id, technologyId: e })),
        { transaction: t }
      );

      // finish transaction
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.log(error);
      return res.send(500);
    }

    return res.redirect("/project/add?alert=1&alertmessage=Data Successfully Saved");
  },

  update: async (req, res) => {
    // desctructur data from request data
    const { name, description } = req.body;
    const { id } = req.params;
    const techLists = JSON.parse(req.body.technologies).map((e) => ({ projectId: id, technologyId: e }));

    // check techlist
    if (techLists.length < 1) {
      return res.redirect(`/project/${id}/edit?alert=2&alertmessage=Technologies must be selected at least 1`);
    }

    // initial transaction
    const t = await sequelize.transaction();
    try {
      // check data exists and permissions
      const project = await Project.findOne({ where: { id } });
      // if project not found
      if (!project) return res.send(404);

      // delete all technologies
      await ProjectTechnology.destroy({ where: { projectId: id } }, { transaction: t });

      // insert technologies
      await ProjectTechnology.bulkCreate(techLists, { transaction: t });

      // upload image
      let imagePath = req.body["image-default"];
      if (req.files) {
        const oldImage = project.image;
        const { image } = req.files;
        const rand = Math.round(Math.random() * 10000);
        imagePath = `/img/projects/${rand}-${image.name}`;
        const fullPath = path.join(__dirname, `/../assets/${imagePath}`);
        image.mv(fullPath);

        // delete image
        try {
          const oldImagePath = path.join(__dirname, `/../assets/${oldImage}`);
          fs.unlinkSync(oldImagePath);
          console.log(`Delete File successfully. ${oldImagePath}`);
        } catch (error) {
          console.log(error);
        }
      }

      // update data
      await project.update({
        name,
        description,
        startDate: req.body["start-date"],
        endDate: req.body["end-date"],
        image: imagePath,
      });

      // finish transaction
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.log(error);
      return res.send(500);
    }

    return res.redirect(`/project/${id}/edit?alert=1&alertmessage=Data Successfully Edited`);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    // get by id
    const project = await Project.findOne({
      where: { id },
      include: { model: ProjectTechnology },
    });
    if (!project) return res.send(404);

    // delete image
    try {
      const oldImagePath = path.join(__dirname, `/../assets/${project.image}`);
      fs.unlinkSync(oldImagePath);
      console.log(`Delete File successfully. ${oldImagePath}`);
    } catch (error) {
      console.log(error);
    }

    await Project.destroy({ where: { id } });
    res.redirect(`/?alert=1&alertmessage=Data Successfully Deleted`);
  },
};
