const { getProjectsData } = require("../mocks/projects");
const durationCalculate = require("../helper/duration-calculate");
const { Technology, Project, ProjectTechnology } = require("../database/models");
const { QueryTypes } = require("sequelize");
const sequelize = require("../helper/sequelize");

module.exports = async (req, res) => {
  const { alert, alertmessage } = req.query;

  const alertSuccess = alert == 1;
  const alertDanger = alert == 2;
  const alertWarning = alert == 3;

  // get all data data ORM ============================================================================================
  const projects = await Project.findAll({
    include: {
      model: ProjectTechnology,
      include: {
        model: Technology,
      },
    },
    order: [["startDate", "DESC"]],
  });
  // get all data data ORM ============================================================================================

  // get all data manual ==============================================================================================
  // get all project
  // const query = `SELECT * FROM projects ORDER BY "startDate" DESC`;
  // const projects = [];
  // const gets = await sequelize.query(query, { type: QueryTypes.SELECT });
  // const getTechnologies = async (projectId) => {
  //   const query = `SELECT tech.* FROM project_technologies AS pt
  //   INNER JOIN technologies AS tech
  //   ON pt."technologyId" = tech.id
  //   WHERE pt."projectId" = ${projectId}`;
  //   return await sequelize.query(query, { type: QueryTypes.SELECT });
  // };
  // // get technologies
  // for (e of gets) {
  //   const project = e;
  //   project.technologies = await getTechnologies(e.id);
  //   projects.push(e);
  // }
  // get all data manual ==============================================================================================

  const projectsRender = projects.map((e) => {
    e.duration = durationCalculate(e.startDate, e.endDate);
    return e;
  });

  // return res.status(200).json(projectsRender); // testing
  res.render("home", {
    alertSuccess,
    alertDanger,
    alertWarning,
    alertMessage: alertmessage,
    projects: projectsRender,
  });
};
