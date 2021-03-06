'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.Provincia,{
        as:'provincia',
        foreignKey:'provinciaId'
      })
      Address.belongsTo(models.User,{
        as:'usuario',
        foreignKey: 'addressId'
      })
    }
  };
  Address.init({
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    cp: DataTypes.STRING,
    provinciaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
    tableName: 'addresses'
  });
  let config = {
    timestamps: false,
    deletedAt: false
}
  return Address;
};