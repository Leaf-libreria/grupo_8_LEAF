'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true.valueOf,
        defaultValue:'profile-users-default.png'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cardNumber: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      rolId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references :{
          model : {
            tableName : 'rols'
          },
          key : 'id'
        }
      },
      addressId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references :{
          model : {
            tableName : 'addresses'
          },
          key : 'id'
        },
        onDelete : 'cascade'
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
    await queryInterface.dropTable('Users');
  }
};