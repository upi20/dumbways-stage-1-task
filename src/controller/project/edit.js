const technologies = require("../../mocks/technologies");
const { getProjectsData } = require("../../mocks/projects");

module.exports = (req, res) => {
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
};
