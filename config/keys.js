
if(process.env.NODE_ENV === "production"){
    module.exports ={
        mongoURI:'mongodb+srv://hamantm:551250111@cluster0.ciztrln.mongodb.net/?retryWrites=true&w=majority',
        secret:'mysecret'
    }
} else{
    module.exports ={
        mongoURI:'mongodb://localhost:27017/HamBlog',
        secret:'mysecret'
    }
}