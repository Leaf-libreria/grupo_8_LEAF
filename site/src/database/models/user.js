'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Address,{
        as:'addressUser',
        foreignKey:'addressId'
      })
      User.belongsTo(models.Rol,{
        as: 'userRol',
        foreignKey: 'rolId'
      })
      User.belongsToMany(models.Book,{
        as:'librosFavoritos',
        through:'favourite',
        foreignKey:'userId',
        otherKey:'bookId'
      })
      User.belongsToMany(models.Book,{
        as:'libros',
        through:'carts',
        foreignKey:'userId',
        otherKey:'bookId',
        onDelete:'cascade',
      })
    }
  };
  User.init({
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING, 
    password: DataTypes.STRING,
    cardNumber: DataTypes.INTEGER,
    rolId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  let config = {
    timestamps: false,
    deletedAt: false
}
  return User;
};