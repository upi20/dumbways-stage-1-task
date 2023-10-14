const path = require("path");
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

    // id
    const projects = getProjectsData();
    let newId = 1;
    if (projects.length > 0) newId = projects[projects.length - 1].id + 1;

    // technologies
    const techLists = techParse(JSON.parse(req.body.technologies));
    if (techLists.length < 1) {
        return res.redirect("/project/add?alert=2&alertmessage=Technologies must be selected at least 1");
    }

    // upload image
    let imagePath = "";
    if (req.files) {
        const { image } = req.files;
        const rand = Math.round(Math.random() * 10000);
        imagePath = `/img/projects/${rand}-${image.name}`;
        const fullPath = path.join(__dirname, `/../../assets/${imagePath}`);
        image.mv(fullPath);
    } else {
        return res.redirect("/project/add?alert=2&alertmessage=Images are required");
    }

    // insert data
    projects.push({
        id: newId,
        name,
        image: imagePath,
        technologies: techLists,
        startDate: req.body["start-date"],
        endDate: req.body["end-date"],
        description,
    });

    saveProjectsData(projects);

    return res.redirect("/project/add?alert=1&alertmessage=Data Successfully Saved");
};
