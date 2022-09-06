const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/comment');
const BlogLike = require('../../models/Like');

/** 
* @route POST api/posts/new
* @desc Register new post
* @access public
*/
router.post('/new', (req,res)=>{
  let id = req.body.id;
    let {
        title,
        description,
        author,
        image
        }= req.body
     const newPost = new Post({
        title,
        description,
        author,
        image
     
    });
    //data is valid, we can register new user.
            newPost.save((err,result)=>{
                if(err){
                    console.log(err)
                }else{
                     User.findById(id, (err, user)=>{
                        if(err){
                            console.log(err)
                        }else{
                            user.post.push(result)
                            user.save(post=>{
                                console.log(post)
                                return res.status(201).json({
                                    success:true,
                                    msg:'post is registered',
                                    post:post
                                });
                            });
                        }
                    })
                }
            })
        });
/** 
* @route POST api/posts/new
* @desc Register new comment
* @access public
*/
router.post('/comment', (req, res)=>{
    let {
        name,
        content, 
    }= req.body
     const newComment = new Comment({
        name,
        content,  
    });
    //data is valid, we can register new user.
            newComment.save((err, result)=>{
                if(err){
                    console.log(err)
                }else{
                    Post.findById(req.body.id, (err, post)=>{
                        if(err){
                            console.log(err)
                        }else{
                            post.comments.push(result)
                            post.save().then( post=>{
                                return res.status(201).json({
                                    success:true,
                                    msg:'comment is registered'
                                });
                            });
                        }
                    })
                }
                    })
                })
 /** 
* @route POST api/posts/new
* @desc Register new like
* @access public
*/               
                
router.post('/like', (req, res)=>{
                    //data is valid, we can register new user.
                    
                    BlogLike.findOne({
                        post:req.body.post,
                        user:req.body.user
                        
                    }).then((data)=>{
                        if(!data){
                            const blogLike = new BlogLike({
                                post:req.body.post,
                                user:req.body.user
                                 
                            });
                            blogLike.save((err, result)=>{
                                if(err){
                                    console.log(err)
                                }else{
                                    Post.findById({_id:req.body.id}, (err, post)=>{
                                        if(err){
                                            console.log(err)
                                        }else{
                                            post.likes.push(result)
                                            post.save().then( post=>{
                                                return res.status(200).json({
                                                    success:true,
                                                    msg:'like succesfully registered',
                                                    result:post
                                                });
                                            });
                                        }
                                    })
                                }
                                    })
                        }else{
                           BlogLike.findByIdAndRemove({_id:data._id},(err, result)=>{
                            if(err){
                                console.log(err)
                            }
                            res.status(201).send({
                                success:true,
                                msg:'like succesfully removed'
                            })
                        });
                           Post.findById(req.body.id, (err, post)=>{
                            if(err){
                                console.log(err)
                            }else{
                                post.likes.pull(data._id)
                                post.save()     
                        }
                    })
                }
                    }).catch((err)=>{
                        console.log(err)
                        res.status(400).json({
                            success:false,
                            msg:err
                        })
                    })
                
                                })

 /** 
* @route GET api/posts/post
* @desc  get post data
* @access private
*/
router.get('/all', async(req, res)=>{
try{
    const data =  await Post.find();
    res.status(200).json({success:true, data:data})
}catch(error){
    res.status(400).json({success:false, msg:error})
}

});

 /** 
* @route GET api/posts/id
* @desc  one post
* @access private
*/

  router.get('/:id', async (req, res)=>{
   const result = await Post.findById(req.params.id).populate('comments').exec((err, result)=>{
    if(err){console.log(err)}
    res.json({success:true, result:result})
   })
}) ;
/** 
* @route Post api/posts/post
* @desc  update post data
* @access public
*/

router.post('/update', (req, res)=>{
    let _id = req.body._id 
    let payload = req.body   
 Post.findByIdAndUpdate(_id, payload,(err, result)=>{
    if(err) res.json({success:false, msg:err})
    res.json({success:true, result:result})
 })
 
});
/** 
* @route post api/posts/post
* @desc  delete post data
* @access public
*/

router.post('/delete', (req, res)=>{
    let _id = req.body.id
   Post.findByIdAndRemove(_id,(err, result)=>{
    if(err) res,send({success:false, msg:err})
    res.send({success:true, result:result, msg:'Post successfully Removed'})
 }) 
 
});


    
   

 module.exports = router;