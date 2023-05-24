'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.MenuTypes, {foreignKey : 'tipe'});

      this.hasMany(models.BookingMenu, {foreignKey : 'menu_id'});
    }
  }
  Menu.init({
    id: {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true,
      allowNull : false,
    },
    nama: {
      type :  DataTypes.STRING,
      allowNull : false,
    },
    harga: {
      type :  DataTypes.INTEGER,
      allowNull : false,
    },
    tipe: {
      type :  DataTypes.INTEGER,
      allowNull : false,
    },
    foto: {
      type :  DataTypes.STRING,
      allowNull : false,
    },
  }, {
    sequelize,
    timestamps : false,
    modelName: 'Menu',
    tableName : 'menu'
  });
  return Menu;
};