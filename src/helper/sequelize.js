const config = require("../config/database.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

module.exports = sequelize;
