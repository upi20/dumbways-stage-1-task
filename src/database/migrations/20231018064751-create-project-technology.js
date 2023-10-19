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
      projectId: {
        type: Sequelize.DataTypes.INTEGER,
        // references: {
        //   model: {
        //     tableName: "projects",
        //     key: "id",
        //   },
        // },
      },
      technologyId: {
        type: Sequelize.DataTypes.INTEGER,
        // references: {
        //   model: {
        //     tableName: "technologies",
        //     key: "id",
        //   },
        // },
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
    await queryInterface.dropTable("project_technologies");
  },
};
