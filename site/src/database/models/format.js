'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Format extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Format.hasMany(models.Book,{
        as:'libros',
        foreignKey:'formatId'
      })
    }
  };
  Format.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Format',
    tableName: 'formats'
  });
  let config = {
    timestamps: false,
    deletedAt: false
}
  return Format;
};