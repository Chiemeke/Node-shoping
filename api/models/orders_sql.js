
const Sequelize = require("sequelize");
const sequelize = require('../configuration/db');
const Order = sequelize.define("orders",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    quantity: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
  });

module.exports = Order ;
