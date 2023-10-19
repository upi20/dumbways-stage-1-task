const durationCalculate = require("../helper/duration-calculate");
const { Technology, Project, ProjectTechnology } = require("../database/models");

module.exports = async (req, res) => {
  const { alert, alertmessage } = req.query;
  const [alertSuccess, alertDanger, alertWarning] = [alert == 1, alert == 2, alert == 3];
  let projects = [];
  try {
    // get data from database
    projects = await Project.findAll({
      include: {
        model: ProjectTechnology,
        include: {
          model: Technology,
        },
      },
      order: [["startDate", "DESC"]],
    });
  } catch (error) {
    return res.status(500).json(error);
  }

  const projectsRender = projects.map((e) => {
    e.duration = durationCalculate(e.startDate, e.endDate);
    return e;
  });

  res.render("home", {
    alertSuccess,
    alertDanger,
    alertWarning,
    alertMessage: alertmessage,
    projects: projectsRender,
  });
};
