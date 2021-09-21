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
      // define association here
    }
  };
  Book.init({
    title: DataTypes.STRING,
    isbn: DataTypes.BIGINT,
    stock: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    slogan: DataTypes.TEXT,
    pages: DataTypes.INTEGER,
    sypnosis: DataTypes.TEXT,
    language: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER,
    formatId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    editorialId: DataTypes.INTEGER,
    starId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};