'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Star.hasMany(models.Book,{
        as:'libros',
        foreignKey:'starId'
      })
    }
  };
  Star.init({
    quantity: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Star',
  });
  let config = {
    timestamps: false,
    deletedAt: false
}
  return Star;
};