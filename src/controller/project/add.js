const technologies = require("../../mocks/technologies");

module.exports = (req, res) => {
    const { alert, alertmessage } = req.query;
    let technologiesHtml = "";
    technologies.forEach((e) => {
        technologiesHtml += `
            <div class="d-inline me-3 text-nowrap">
                <input type="checkbox" id="technologies-${e.id}" name="technologies[${e.id}]" data-id="${e.id}" class="form-check-input technologies">
                <label for="technologies-${e.id}" class="form-check-label">${e.name}</label>
            </div>
        `;
    });

    const alertSuccess = alert == 1;
    const alertDanger = alert == 2;
    const alertWarning = alert == 3;
    res.render("project", { technologiesHtml, alertSuccess, alertDanger, alertWarning, alertMessage: alertmessage });
};
