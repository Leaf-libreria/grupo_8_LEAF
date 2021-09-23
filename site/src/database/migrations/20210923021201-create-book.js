'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isbn: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      slogan: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      synopsis: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cover: {
        type: Sequelize.STRING,
        allowNull: false
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references :{
          model : {
            tableName : 'authors'
          },
          key : 'id'
        }
      },
      genreId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references :{
          model : {
            tableName : 'genres'
          },
          key : 'id'
        }
      },
      formatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references :{
          model : {
            tableName : 'formats'
          },
          key : 'id'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references :{
          model : {
            tableName : 'categories'
          },
          key : 'id'
        }
      },
      editorialId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references :{
          model : {
            tableName : 'editorials'
          },
          key : 'id'
        }
      },
      starId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references :{
          model : {
            tableName : 'stars'
          },
          key : 'id'
        }
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Books');
  }
};