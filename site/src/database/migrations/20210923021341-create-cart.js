'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references :{
          model : {
            tableName : 'books'
          },
          key : 'id'
        },
        onDelete : 'cascade'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references :{
          model : {
            tableName : 'users'
          },
          key : 'id'
        },
        onDelete : 'cascade'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      purchaseorderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references :{
          model : {
            tableName : 'purchaseorders'
          },
          key : 'id'
        },
        ondelete: 'cascade'
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
    await queryInterface.dropTable('Carts');
  }
};