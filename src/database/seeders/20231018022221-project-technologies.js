"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "project_technologies",
      [
        { projectId: 1, technologyId: 1, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 1, technologyId: 2, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 1, technologyId: 3, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 1, technologyId: 4, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 2, technologyId: 1, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 2, technologyId: 2, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 2, technologyId: 4, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 3, technologyId: 2, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 3, technologyId: 3, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 3, technologyId: 4, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 4, technologyId: 1, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 4, technologyId: 2, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 4, technologyId: 4, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 5, technologyId: 1, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 5, technologyId: 3, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
        { projectId: 5, technologyId: 4, updatedAt: "2023-01-01", createdAt: "2023-01-01" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
