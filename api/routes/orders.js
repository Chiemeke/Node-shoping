const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product = require('../models/product');


router.get('/',(req,res,next)=>{

   Order.find()
   .exec()
   .then(docs => {
        console.log(docs);
        res.status(200).json(docs); 
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({
           error: err
       })
   })
});

router.post('/',(req,res,next)=>{
    Product.findById(req.body.productId)
    .then(product => {
        if(!product){
            return res.status(404).json({
                message: "product not found"
            })
        }
        const order = new Order({
            _id:  mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        order.save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err  
        })
    })
   
});
router.get('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;
    Order.findById(req.params.orderId)
    .then(order => {
            res.status(200).json({
                order: order,
            })
        }
     )
     .catch(err => {
        res.status(500).json({
            error: err  
        })
    })
});

router.patch('/:id',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling PATCH request to /product'
    });
});

router.post('/:id',(req,res,next)=>{
    res.status(201).json({
        message: 'Handling POST request to /products'
    });
});
module.exports= router;