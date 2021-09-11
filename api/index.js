const sequelize = require("./configuration/db");
const Product = require('./models/products2');
const Order  = require('./models/orders_sql');
const User = require('./models/users_sql');

User.hasMany(Order);
Order.belongsTo(Product);

sequelize.sync().then(result => {
    console.log(result);
}).catch(err=> {
    console.log(err);
});