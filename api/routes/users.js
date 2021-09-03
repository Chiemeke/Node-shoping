const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req,res,next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: "Email already exists"
            });
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User(
                        {
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                           password: hash
                        }
                    )
                    user.save()
                    .then( result => {
                            res.status(201).json(result);
                            console.log("user created successfully")
                        }
                    )
                    .catch(err=>{
                        res.status(500).json({
                            error: err
                        })
                    });
                }
            })
        }
    })
        
 });
 
 router.post('/login', (req,res,next)=> {
    User.find({email: req.body.email})
    .then(user=>{
        if(user.length < 1){
            return res.status(401).json({
                message: 'Auth failed'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(result){

                const token =  jwt.sign(
                    {
                     email: user[0].email,
                     userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    },
                   
                 );
                return res.status(200).json({
                    message: 'Auth Successful',
                    token : token
                });
            }else{

                return res.status(401).json({
                    
                    mssage: 'Auth failed',
                    
                })
            }

        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    });
})

module.exports= router;