'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paymentmethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Paymentmethod.hasMany(models.Purchaseorder,{
        as:'ordenesDeCompra',
        foreignKey:'paymentMethodId'
      })
    }
  };
  Paymentmethod.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paymentmethod',
  });
  let config = {
    timestamps: false,
    deletedAt: false
}
  return Paymentmethod;
};