const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/User');
const keys = require('../../config/keys').secret;

/** 
* @route POST api/users/register
* @desc Register the user
* @access public
*/
router.post('/register', (req,res)=>{
    let {
        username,
        email,
        password,
        confirm_password,
        

     } = req.body

    if(password !== confirm_password){
        return res.status(400).json({
            msg:'password does match.'
        });
    }
    //check for unique email
    User.findOne({
        email : email
    }).then( user=>{
        if(user){
            return res.status(400).json({
                msg:'Email already Registereg. Did you forgot your password?'
        })
    }
    });

    //data is valid, we can register new user.
    let newUser = new User({
       username,
        email,
        password,
      
    });
    //hash password
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save().then( user=>{
                return res.status(201).json({
                    success:true,
                    msg:'you are now Registered'
                });
            });
        });
    });

});

/** 
* @route POST api/users/login
* @desc signing in a  user
* @access public
*/
router.post('/login', (req,res)=>{
   User.findOne({
    email:req.body.email
   }).then(user=>{
    if(!user){
        return res.status(404).json({
            success:false,
            msg:'email not found'

        })
    }
    //if there is user, compare password
    bcrypt.compare(req.body.password, user.password).then(isMatch=>{
        if(isMatch){
            //if password correct, we send json token for that user
            const paylaod ={
                _id:user._id,
                username:user.username,
                email:user.email,
            }
            jwt.sign(paylaod,keys,{expiresIn:604800}, (err,token)=>{
                return res.status(200).json({
                    success:true,
                    token:`${token}`,
                    user:user,
                    msg:'you are now logged in'
                })
            })
    
        }else {
            return res.status(404).json({
                success:false,
                msg:'incorrect password'
            })
        }
    })
   })
});

/**  passport.authenticate('jwt', {session: false}),
* @route GET api/users/post
* @desc  get user's data
* @access private
*/
router.get('/profile', passport.authenticate( 'jwt', {session: false}),  (req, res)=>{
    User.findById(req.user._id).populate('post').exec((err, result)=>{
        if(err){
            console.log(err)
        }
        res.json({
            user: result
        })
    })  
});
router.get('/user', async(req, res)=>{
    User.find((err, result)=>{
      if(err)throw err;
      res.send({success:true, result:result});
    })
  })
module.exports = router;