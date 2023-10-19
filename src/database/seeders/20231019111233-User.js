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
      "users",
      [
        {
          name: "Isep Lutpi Nur",
          email: "iseplutpinur7@gmail.com",
          password: "$2b$10$khVMA4bq9gqD.N66FRc2Xu/lx5OXz6gXbxA4BsvQiCINKfgdGUtNS",
          updatedAt: "2023-01-01",
          createdAt: "2023-01-01",
        },
      ],
      {}
    );
    // $2b$10$khVMA4bq9gqD.N66FRc2Xu/lx5OXz6gXbxA4BsvQiCINKfgdGUtNS 123
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
