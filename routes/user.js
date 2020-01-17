const express= require('express');
const router= express.Router();
var Kinvey = require('kinvey-node-sdk');
const async = require('async');
var app = express();
//User model

// const User= require('../models/User');


//Login and Register Page
router.get('/login', (req, res)=>res.render('login'));
router.get('/register', (req, res)=>res.render('register'));


router.post('/register',(req, res)=>{
        //mytext is the name of your input box 
    console.log(req.body);
    var Username = req.body.name;
    var Password=req.body.password;
   
    //res.send('hello'+ ' '+ Username);
    module.exports.userCreate = async (context, complete, modules) => {
        
         const options = { useBl: false, useUserContext: false };
         const userStore = modules.userStore(options);
         var Username = req.body.name;
         var Password=req.body.password;
         console.log("Username" +" " +Username + " "+ password);
         const user = {
            KinveyUsername:Username,
         KinveyPassword:Password
          };
        //  const query = new modules.Query();
        //  query.create(user);
        //  this.username = Username;
        //    this.password = Password;
     
        try {
           const result = await userStore.create(user);
           complete()
             .setBody(result)
             .done();
             Console.log("User Created:"+ result);
             res.send('hello'+ ' '+ Username);        
         } catch (error) {
           complete(error)
             .runtimeError()
             .done();
         }
             };
});

router.post('/login',(req, res)=>{
    //mytext is the name of your input box 
console.log(req.body);
module.exports.userFindByIds = async (context, complete, modules) => {
    const options = { useBl: false, useUserContext: true };
    const userStore = modules.userStore(options);
    const query = new modules.Query();
    query.equalTo('username', request.body.name);
    userStore.find(query, (err,result) => {
    // userStore.findById('5e1c6e9804411d001624d814', (err, result) => {
      if (err) {
        return complete().setBody(err).runtimeError().done();
      }
      result.status = 'Approved';
      userStore.update(result, (err, savedResult) => {
        if (err) {
          return complete(err).runtimeError().done();
        }
        complete().setBody(savedResult).ok().next();
      });
    });
    }

    return res.redirect('/Dashboard');
});


    
       



   

      
        module.exports= router;
    
        
 //mytext is the name of your input box 

        // res.send('Your Text:' +Username);  

 
           



    

