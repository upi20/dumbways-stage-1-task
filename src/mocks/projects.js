const path = require("path");
const fs = require("fs");
const dataPath = path.join(__dirname, `../../database/projects.json`);

const saveProjectsData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(dataPath, stringifyData);
};

const getProjectsData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};

module.exports = {
    saveProjectsData,
    getProjectsData,
};
