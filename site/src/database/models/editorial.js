'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Editorial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Editorial.hasMany(models.Book,{
        as:'libros',
        foreignKey:'editorialId'
      })
    }
  };
  Editorial.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Editorial',
    tableName: 'editorials'
  });
  let config = {
    timestamps: false,
    deletedAt: false
}
  return Editorial;
};