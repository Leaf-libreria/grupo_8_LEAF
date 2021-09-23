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
      Purchaseorder.hasMany(models.Cart,{
        as:'carts',
        foreignKey:'cartId',
      })
      Purchaseorder.belongsTo(models.Paymentmethod,{
        as:'metodoDePago',
        foreignKey:'paymentMethodId'
      })
    }
  };
  Purchaseorder.init({
    cartId: DataTypes.INTEGER,
    paymentmethodId: DataTypes.INTEGER,
    finalprice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Purchaseorder',
  });
  let config = {
    timestamps: false,
    deletedAt: false
}
  return Purchaseorder;
};