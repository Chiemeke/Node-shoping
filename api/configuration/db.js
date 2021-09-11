const  Sequelize  = require('sequelize');

const sequelize = new Sequelize("node_shop2", "chiemeke", "Password123.", {
    host: "localhost",
    dialect: "mysql"
  });

  

module.exports = sequelize; 