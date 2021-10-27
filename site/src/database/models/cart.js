'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.Purchaseorder,{
        as:'ordenDePago',
        foreignKey:'cartId',
      })
      Cart.belongsTo(models.Book,{
        as: 'libro',
        foreignKey : 'bookId'
      })
    }
  };
  Cart.init({
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  let config = {
    timestamps: false,

    deletedAt: false
}
  return Cart;
};