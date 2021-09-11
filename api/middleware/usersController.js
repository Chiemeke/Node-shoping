const express = require('express');
const router = express.Router();
const User = require('../models/users_sql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

signUp = async (req,res,next) => {
    try{
        const user = await User.findOne({ where: { email: req.body.email } });
        console.log(user);
            if (user != null) {
              res.status(500).json({
                    err: "Mail already exist" 
                });
            }

 
    try{
        const hash = await bcrypt.hash("password",10);
      const user =  await User.create({ email: req.body.email, password: hash 
    });
        res.status(200).json({
            Message: "Created Successfully"
        })
    }catch(e){
     
        res.status(500).json({
            err: "Something went wrong111!"
        })
    }
    
              
    }catch(err){
        console.log(err);
    }





}

login = async(req,res,next)=>{
    const user = await User.findOne({where: {email: req.body.email}});
    if(user== null){
        res.status(500).json({
            Message: "Auth Failed"
        })
    }else{

        bcrypt.compare(req.body.password,user["password"],(err,result)=>{
            if(result){

                const token =  jwt.sign(
                    {
                     email: user["email"],
                     userId: user["id"]
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
    }

}
module.exports = {signUp,login};
