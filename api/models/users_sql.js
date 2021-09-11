
const Sequelize = require("sequelize");
const sequelize = require('../configuration/db');
const User = sequelize.define("users",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is:  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
        }
       
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
  });

module.exports = User ;
