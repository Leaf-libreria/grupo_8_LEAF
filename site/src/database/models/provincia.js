'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provincia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Provincia.hasMany(models.Address,{
        as:'address',
        foreignKey:'provinciaId'
      })
    }
  };
  Provincia.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Provincia',
    tableName:'provincias'
  });
  let config = {
    timestamps: false,
    deletedAt: false
}
  return Provincia;
};