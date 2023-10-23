const durationCalculate = require("../helper/duration-calculate");
const { Technology, Project, ProjectTechnology, User } = require("../database/models");

module.exports = async (req, res) => {
  const { alert, alertmessage } = req.query;
  const [alertSuccess, alertDanger, alertWarning] = [alert == 1, alert == 2, alert == 3];

  // userId
  let userId = null;
  if (req.session.isLogin) userId = req.session.authUser.id;

  // get data from database
  const projects = await Project.findAll({
    // where: { userId: req.session.authUser.id },
    include: [
      {
        model: ProjectTechnology,
        include: { model: Technology },
      },
      { model: User },
    ],
    order: [["startDate", "DESC"]],
  });
  console.log(userId);
  const projectsRender = projects.map((e) => {
    e.duration = durationCalculate(e.startDate, e.endDate);
    e.canEdit = e.userId == userId;
    return e;
  });

  return res.render("home", {
    alertSuccess,
    alertDanger,
    alertWarning,
    alertMessage: alertmessage,
    projects: projectsRender,
    isLogin: req.session.isLogin,
    loginUser: req.session.authUser,
    userId,
  });
};
