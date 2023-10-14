const { getProjectsData } = require("../mocks/projects");
const durationCalculate = require("../helper/duration-calculate");

module.exports = (req, res) => {
    const { alert, alertmessage } = req.query;
    const projects = getProjectsData();
    const projectsRender = projects.map((e) => {
        e.duration = durationCalculate(e.startDate, e.endDate);
        return e;
    });

    const alertSuccess = alert == 1;
    const alertDanger = alert == 2;
    const alertWarning = alert == 3;
    res.render("home", {
        alertSuccess,
        alertDanger,
        alertWarning,
        alertMessage: alertmessage,
        projects: projectsRender,
    });
};
