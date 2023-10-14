const path = require("path");
const fs = require("fs");
const technologies = require("../../mocks/technologies");

const { getProjectsData, saveProjectsData } = require("../../mocks/projects");

const techParse = (techs = []) => {
    const results = [];
    techs.forEach((id) => {
        const find = technologies.find((e) => e.id == id);
        if (find) results.push(find);
    });
    return results;
};

module.exports = (req, res) => {
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
        const fullPath = path.join(__dirname, `/../../assets/${imagePath}`);
        image.mv(fullPath);
        project.image = imagePath;

        // delete image
        try {
            const oldImagePath = path.join(__dirname, `/../../assets/${oldImage}`);
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
};
