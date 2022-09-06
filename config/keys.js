
if(process.env.NODE_ENV === "production"){
    module.exports ={
        mongoURI:'mongodb+srv://haman:551250111@hamanblog.1p8irif.mongodb.net/?retryWrites=true&w=majority',
        secret:'mysecret'
    }
} else{
    module.exports ={
        mongoURI:'mongodb://localhost:27017/HamBlog',
        secret:'mysecret'
    }
}