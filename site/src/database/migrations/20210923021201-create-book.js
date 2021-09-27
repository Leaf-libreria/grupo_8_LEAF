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
<<<<<<< HEAD
        type: Sequelize.STRING,
        allowNull: false,
        default: 'default-image.png'
=======
        type: Sequelize.STRING(500),
        allowNull: false,
        defaultValue:'default-image-book.png'
>>>>>>> 819d82542dfbfc2220bef09d1cd27195ee75e3eb
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
        allowNull: true,
        defaultValue:'Español'
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Books');
  }
};