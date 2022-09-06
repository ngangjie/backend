const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
 require('dotenv').config()


//initialized the app
const app = express();

//middlewares
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
//initialized passport
app.use(passport.initialize());

//bring in passport strategy
require('./config/passport')(passport);
//initialize router


//bring in the database connection
const db = require('./config/keys').mongoURI;
mongoose.connect(db).then(()=> {
    console.log(`database connected successfully ${db}`)
}).catch(err => console.log(`unable to connect to database ${err}`));

//brings in the users routes
const users = require('./routes/api/users');
app.use('/api/users', users);
//bring in posts routes
const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
 })



const PORT = process.env.PORT||5000
app.listen(PORT, ()=>{
    console.log(`server started on port ${PORT}`)
})