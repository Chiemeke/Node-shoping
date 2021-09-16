const  Sequelize  = require('sequelize');

const sequelize = new Sequelize("node_shop2", process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql"
  });

  

module.exports = sequelize; 