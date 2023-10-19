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
      "technologies",
      [
        {
          id: 1,
          name: "Node Js",
          icon: '<i class="fa-brands fa-node-js"></i>',
          updatedAt: "2023-01-01",
          createdAt: "2023-01-01",
        },
        {
          id: 2,
          name: "Next Js",
          icon: '<i class="fa-solid fa-n"></i>',
          updatedAt: "2023-01-01",
          createdAt: "2023-01-01",
        },
        {
          id: 3,
          name: "React Js",
          icon: '<i class="fa-brands fa-react"></i>',
          updatedAt: "2023-01-01",
          createdAt: "2023-01-01",
        },
        {
          id: 4,
          name: "TypeScript",
          icon: '<i class="fa-solid fa-code"></i>',
          updatedAt: "2023-01-01",
          createdAt: "2023-01-01",
        },
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

// npx sequelize-cli model:generate --name ProjectTechnology --attributes projectId:string,technologyId:string
