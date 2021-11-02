'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Purchaseorders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      paymentmethodId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references :{
          model : {
            tableName : 'paymentmethods'
          },
          key : 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references :{
          model : {
            tableName : 'users'
          },
          key : 'id'
        }
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      finalprice: {
        type: Sequelize.DECIMAL,
        allowNull: false
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
    await queryInterface.dropTable('Purchaseorders');
  }
};