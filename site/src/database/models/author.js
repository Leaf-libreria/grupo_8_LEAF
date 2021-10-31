'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Author.hasMany(models.Book,{
        as:'autores',
        foreignKey:'authorId'
      })
    }
  };
  Author.init({
    nameLastname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Author',
  });
  let config = {
    timestamps: false,
    deletedAt: false,
    tableName: 'author'
}
  return Author;
};