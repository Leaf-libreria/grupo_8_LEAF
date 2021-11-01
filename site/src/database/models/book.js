'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo(models.Genre,{
        as:'genero',
        foreignKey:'genreId'
      })
      Book.belongsTo(models.Author,{
        as:'autor',
        foreignKey:'authorId'
      })
      Book.belongsTo(models.Format,{
        as:'formato',
        foreignKey:'formatId'
      })
      Book.belongsTo(models.Category,{
        as:'categoria',
        foreignKey:'categoryId'
      })
      Book.belongsTo(models.Editorial,{
        as:'editorial',
        foreignKey:'editorialId'
      })
      Book.belongsTo(models.Star,{
        as:'estrella',
        foreignKey:'starId'
      })
      Book.belongsToMany(models.User,{
        as:'usuariosFavoritos',
        through:'favourite',
        foreignKey:'bookId',
        otherKey:'userId'
      })
      Book.belongsToMany(models.User,{
        as:'usuarios',
        through:'carts',
        foreignKey:'bookId',
        otherKey:'userId'
      })
     
    }
  };
  Book.init({
    title: DataTypes.STRING,
    isbn: DataTypes.BIGINT,
    stock: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    slogan: DataTypes.TEXT,
    pages: DataTypes.INTEGER,
    synopsis: DataTypes.TEXT,
    cover: DataTypes.STRING,
    pdf: DataTypes.STRING,
    qrCode: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER,
    formatId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    editorialId: DataTypes.INTEGER,
    starId: DataTypes.INTEGER,
    language: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  let config = {
    timestamps: false,

    deletedAt: false
}
  return Book;
};