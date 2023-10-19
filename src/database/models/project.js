"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.hasMany(models.ProjectTechnology, {
        foreignKey: "projectId",
      });
      Project.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Project.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      startDate: DataTypes.DATEONLY,
      endDate: DataTypes.DATEONLY,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Project",
      tableName: "projects",
    }
  );
  return Project;
};
