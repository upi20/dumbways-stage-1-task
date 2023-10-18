"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("project_technologies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      technologyId: {
        type: Sequelize.DataTypes.INTEGER,
        // references: {
        //   model: {
        //     tableName: "technologies",
        //     // schema: "schema",
        //   },
        //   key: "id",
        // },
        // allowNull: false,
      },
      projectId: {
        type: Sequelize.DataTypes.INTEGER,
        // references: {
        //   model: {
        //     tableName: "projects",
        //     // schema: "schema",
        //   },
        //   key: "id",
        // },
        // allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProjectTechnologies");
  },
};
