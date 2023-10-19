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
      "projects",
      [
        {
          userId: 1,
          name: "Dumbsway Mobile App - 2021",
          image: "/img/projects/1.png",
          startDate: "2023-01-01",
          endDate: "2023-05-01",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.Magnam repellendus magni beatae! Aspernatur nisi facilis illum inventore consequatur neque minus est.",
          updatedAt: "2023-01-01",
          createdAt: "2023-01-01",
        },
        {
          userId: 1,
          name: "Dumbsway Mobile App - 2023",
          image: "/img/projects/2.png",
          startDate: "2023-01-10",
          endDate: "2023-05-01",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.Magnam repellendus magni beatae! Aspernatur nisi facilis illum inventore consequatur neque minus est.",
          updatedAt: "2023-01-01",
          createdAt: "2023-01-01",
        },
        {
          userId: 1,
          name: "Dumbsway Mobile App - 2021",
          image: "/img/projects/3.png",
          startDate: "2023-01-01",
          endDate: "2023-05-01",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.Magnam repellendus magni beatae! Aspernatur nisi facilis illum inventore consequatur neque minus est.",
          updatedAt: "2023-01-01",
          createdAt: "2023-01-01",
        },
        {
          userId: 1,
          name: "Dumbsway Mobile App - 2021",
          image: "/img/projects/4.png",
          startDate: "2023-01-01",
          endDate: "2023-05-01",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.Magnam repellendus magni beatae! Aspernatur nisi facilis illum inventore consequatur neque minus est.",
          updatedAt: "2023-01-01",
          createdAt: "2023-01-01",
        },
        {
          userId: 1,
          name: "Dumbsway Mobile App - 2021",
          image: "/img/projects/5.png",
          startDate: "2023-01-01",
          endDate: "2023-05-01",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.Magnam repellendus magni beatae! Aspernatur nisi facilis illum inventore consequatur neque minus est.",
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
