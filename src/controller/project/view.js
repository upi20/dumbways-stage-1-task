const { getProjectsData } = require("../../mocks/projects");
const durationCalculate = require("../../helper/duration-calculate");

const formatDate = (date = "") => {
    date = new Date(date);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return [date.getDate(), months[date.getMonth()], date.getFullYear()].join(" ");
};

module.exports = (req, res) => {
    let project = getProjectsData().find((e) => e.id == req.params.id);

    // if project not found
    if (!project) return res.send(404);

    // if project found
    project.duration = durationCalculate(project.startDate, project.endDate);
    project.startDateStr = formatDate(project.startDate);
    project.endDateStr = formatDate(project.endDate);
    res.render("project-detail", { project });
};
