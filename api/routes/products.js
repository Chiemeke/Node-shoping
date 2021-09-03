const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');
const mongoose = require('mongoose');


router.get('/',(req,res,next)=>{
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.post('/', checkAuth,(req,res,next)=>{
    
    const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
    });
    console.log(req.body.name);
    console.log(req.body.price);
    product.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST request to /products',
             createdProduct: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err 
        })
    }

        );
   
});


router.get('/:productID',(req,res,next)=>{
    const id = req.params.productID;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                message: "No valid entry found"
            })
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });

});

router.patch('/:id',(req,res,next)=>{
    const id = req.params.id;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Product.update({ _id: id},{  $set:updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
      
});


router.delete('/:id',(req,res,next)=>{
    const id = req.params.id;
    Product.remove({_id: id})
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err 
        })
    });
});
module.exports= router;