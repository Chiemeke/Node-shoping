const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');
const mongoose = require('mongoose');

// Connect to MongodB 
const dbURI = 'mongodb+srv://chiemeke:'+ process.env.MONGO_ATLAS_PW +'@dnuel.bsd9s.mongodb.net/my-webStore?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>{console.log('connected to the db')})
.catch((err)=>console.log(err));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if(req.method=== 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/users',userRoutes);

app.use((req, res,next) => {
    const error = new Error('Not found');
    error.status = 404; 
    next(error);
 });
 app.use((error,req,res,next)=>{
     res.status(error.status||500);
     res.json({
         error: {
             message: error.message
         }
     });
 });
module.exports = app ;