const express = require('express');

const   Order = require('../models/orders_sql');


getOrders = async (req,res,next)=>{
    try{
         const order = await Order.findAll({where: {userId: req.userData.userId}});
         res.status(200).json(order);
    }catch(e){
        res.status(500).json({
            error: e 
        })
        console.log(e);
    }
 
}

getOrdersbyId = async(req,res,next)=> {
    const _id = req.params.orderI;
    try{
        const order = await Order.findOne({where:{id:_id}});
        res.status(200).json(order);
    }catch(e){
        res.status(500).json({
            error: e
        })
        console.log(e);
    }
}

postOrders = async(req,res,next)=>{
    
    try{
        const order = await Order.create({
            quantity: req.body.quantity,
            productId: req.body.productId,
            userId: req.userData.userId
        })
        res.status(200).json(order);
       
    }catch(e){
        res.status(500).json({error: e});
        console.log(e);
    }
}

patchOrders = async(req,res,next) =>{
    try{
        const _id = req.params.id;
        const updateOps = {};
        for(const ops of req.body.update){
         
            updateOps[ops.propName] = ops.value
        }

       const order = await Order.update(updateOps, {
            where: {
              id: _id
            }
          });
        res.status(200).json(order);
    }catch(e){
        console.log(e);
        res.status(500).json({
            error: e
        });
    }
}

deleteOrders = async(req,res,next) => {
    const _id = req.params.id ;
    try{
        const order = await Order.destroy({
            where:{id: _id}
        })
        res.status(200).json(order);
    }catch(e){
        console.log(e);
        res.status(500).json({
            error: e
        });
    }
}

module.exports = {getOrdersbyId,getOrders,postOrders,patchOrders,deleteOrders};