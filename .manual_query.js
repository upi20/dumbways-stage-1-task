// const { QueryTypes } = require("sequelize");
// const sequelize = require("../../helper/sequelize");

// home.js // =====================================================================================
// // get all project
// const query = `SELECT * FROM projects ORDER BY "startDate" DESC`;
// const projects = [];
// const gets = await sequelize.query(query, { type: QueryTypes.SELECT });
// const getTechnologies = async (projectId) => {
//   const query = `SELECT tech.* FROM project_technologies AS pt
//   INNER JOIN technologies AS tech
//   ON pt."technologyId" = tech.id
//   WHERE pt."projectId" = ${projectId}`;
//   return await sequelize.query(query, { type: QueryTypes.SELECT });
// };
// // get technologies
// for (e of gets) {
//   const project = e;
//   project.technologies = await getTechnologies(e.id);
//   projects.push(e);
// }
// home.js // =====================================================================================

// project/add.js =================================================================================
// const query = `SELECT * FROM technologies ORDER BY "name" ASC`;
// const technologies = await sequelize.query(query, { type: QueryTypes.SELECT });
// project/add.js =================================================================================
