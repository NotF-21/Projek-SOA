'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('menu_types', [
      {
        nama:"Breakfast"
      },
      {
        nama:"Lunch"
      },
      {
        nama:"Dinner"
      },
      {
        nama:"Dessert"
      },
      {
        nama:"Kids"
      },
      {
        nama:"Vegan"
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('menu_types', null, {truncate : true, cascade : true});
  }
};
