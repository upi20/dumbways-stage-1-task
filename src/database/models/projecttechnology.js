"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectTechnology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProjectTechnology.belongsTo(models.Technology, {
        foreignKey: "technologyId",
      });

      ProjectTechnology.belongsTo(models.Project, {
        foreignKey: "projectId",
      });
    }
  }
  ProjectTechnology.init(
    {
      projectId: DataTypes.INTEGER,
      technologyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProjectTechnology",
      tableName: "project_technologies",
    }
  );
  return ProjectTechnology;
};
