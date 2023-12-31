"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Technology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Technology.hasMany(models.ProjectTechnology, {
        foreignKey: "technologyId",
      });
    }
  }
  Technology.init(
    {
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Technology",
      tableName: "technologies",
    }
  );
  return Technology;
};
