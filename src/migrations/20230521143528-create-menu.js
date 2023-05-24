'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menu', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      harga: {
        type: Sequelize.INTEGER,
        allowNull : false,
      },
      tipe: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      foto: {
        type: Sequelize.STRING,
        allowNull : false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('menu');
  }
};