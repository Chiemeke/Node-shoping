const express = require('express');
const router = express.Router();
const Product = require('../models/products2');

getProducts = async (req,res,next)=>{
    try{
         const product = await Product.findAll();
         res.status(200).json(product);
    }catch(e){
        res.status(500).json({
            error: e 
        })
        console.log(e);
    }
 
}

getProductbyId = async(req,res,next)=> {
    const _id = req.params.productID;
    try{
        const product = await Product.findOne({where:{id:_id}});
        res.status(200).json(product);
    }catch(e){
        res.status(500).json({
            error: e
        })
        console.log(e);
    }
}

postProducts = async(req,res,next)=>{
    try{
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price
        })
        res.status(200).json(product);
    }catch(e){
        res.status(500).json({error: e});
        console.log(e);
    }
}

patchProduct = async(req,res,next) =>{
    try{
        const _id = req.params.id;
        const updateOps = {};
        for(const ops of req.body.update){
         
            updateOps[ops.propName] = ops.value
        }

       const product = await Product.update(updateOps, {
            where: {
              id: _id
            }
          });
        res.status(200).json(product);
    }catch(e){
        console.log(e);
        res.status(500).json({
            error: e
        });
    }
}

deleteProduct = async(req,res,next) => {
    const _id = req.params.id ;
    try{
        const product = await Product.destroy({
            where:{id: _id}
        })
        res.status(200).json(product);
    }catch(e){
        console.log(e);
        res.status(500).json({
            error: e
        });
    }
}

module.exports = {getProductbyId,getProducts,postProducts,patchProduct,deleteProduct};