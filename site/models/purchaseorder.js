'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchaseorder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Purchaseorder.init({
    finalPrice: DataTypes.DECIMAL,
    cartId: DataTypes.INTEGER,
    paymentmethodId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Purchaseorder',
  });
  return Purchaseorder;
};