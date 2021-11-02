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
        foreignKey:'purchaseorderId',
        onDelete : 'cascade'
      })
      Purchaseorder.belongsTo(models.Paymentmethod,{
        as:'metodoDePago',
        foreignKey:'paymentmethodId'
      })
      Purchaseorder.belongsTo(models.User,{
        as:'usuario',
        foreignKey:'userId'
      })
    }
  };
  Purchaseorder.init({
    paymentmethodId: DataTypes.INTEGER,
    finalprice: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER,
    status:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Purchaseorder',
    tableName: 'purchaseorders'
  });
  let config = {
    timestamps: false,
    deletedAt: false
}
  return Purchaseorder;
};