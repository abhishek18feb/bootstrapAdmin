const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UsersModel');


//Simple version, without validation or sanitation
exports.signup = (req, res, next)=>{
    console.log(req.body)
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message: "Mail Exists"
            });
        }else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
               if(err){
                   return res.status(500).json({
                        error: err
                   })
               }
               else{
                   const user = new User({
                                            _id: new mongoose.Types.ObjectId(),
                                            email: req.body.email,
                                            password: hash
                                        });
                    user.save()
                    .then(result => {
                        console.log(result)
                        res.status(201).json({
                            message: "User Created",
                            createdProduct: {
                                email: result.email,
                                password: result.password,
                                _id: result._id,
                                request: {
                                    type: 'GET',
                                    url: 'http://localhost:3000/users/'+result._id
                                }
                            }
                        });
                    })
                    .catch(err=>{
                                console.log(err)
                                res.status(500).json({
                                    error: err
                                });
                            });
               }
            });
        }
    });
}
exports.login = (req, res, next)=>{
    //console.log(req.body)
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        console.log(user);
        if(user.length<1){
            return res.status(401).json({
                message: 'Mail not found, User doesn\'t exist'
            });
        }else{
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                if(err){
                    return res.status(401).json({
                        error:"Auth failed"
                    });
                }
                if(result){
                    const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    "secret",
                    {
                      expiresIn: "1h"
                    }
                    );
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token: token
                    });
                }
                return res.status(401).json({
                    error:"Auth failed"
                });
            });
        }
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });
}

exports.user_delete_user = (req, res, next) =>{
    const id = req.params.userId;
    User.remove({_id: id})
    .exec()
    .then(result=>{
        if(result.length>=1){
            res.status(200).json({
            message: 'Deleted User',
            request:{
                type: "POST",
                body: {
                    type: 'POST',
                    url: "localhost:3000/user/signup",
                    body: {email: 'String', password: 'String'}
                }
            }
        });
        }else{
            res.status(404).json({
                message: 'User Not found'
            });
        }

    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });

}
