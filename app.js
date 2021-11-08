const express = require('express');
const mongoose = require('mongoose');
const authRoutes= require('./routes/authRoutes')
const morgan =require('morgan')
const cookieParser =require('cookie-parser');
const app = express();
const {requireAuth, checkUser} =require('./middleware/authMiddleware');

// middleware
app.use(express.static('public'));
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://dharan:dharan97100@nodejs.3nrp7.mongodb.net/nodeauth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

//coookies

// app.get('/set-cookie', (req,res)=>{
//   // res.setHeader('set-cookie','newUser=true');
//   res.cookie('newUser',false);
//   res.cookie('isEmployee',true,{maxAge:1000*60*60*24,httpOnly:true});

//   res.send('You got the cookies');
// })

// app.get('/read-cookies',(req,res)=>{
//   const cookies=req.cookies;
//   console.log(cookies);
//   res.json(cookies);
//   //cookies.newUser
// });

