const path = require("path");
const fs = require("fs");

const { getProjectsData, saveProjectsData } = require("../../mocks/projects");

module.exports = (req, res) => {
    // desctructur data
    const { id } = req.params;
    let projects = getProjectsData();

    // find data
    let project = projects.find((e) => e.id == id);
    // if project not found
    if (!project) return res.send(404);

    // delete image
    try {
        const oldImagePath = path.join(__dirname, `/../../assets/${project.image}`);
        fs.unlinkSync(oldImagePath);
        console.log(`Delete File successfully. ${oldImagePath}`);
    } catch (error) {
        console.log(error);
    }
    projects = projects.filter((e) => e.id != id);
    saveProjectsData(projects);

    res.redirect(`/?alert=1&alertmessage=Data Successfully Deleted`);
};
