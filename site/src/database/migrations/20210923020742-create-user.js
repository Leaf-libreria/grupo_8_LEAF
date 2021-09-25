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
      rolId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references :{
          model : {
            tableName : 'rol'
          },
          key : 'id'
        }
      },
      addressId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references :{
          model : {
            tableName : 'address'
          },
          key : 'id'
        }
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