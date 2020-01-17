const sdk = require('kinvey-flex-sdk');
const express= require('express');
const expressLayouts=  require('express-ejs-layouts');
var path= require('path');
var Kinvey = require('kinvey-node-sdk');
const handlers = require('./handlers/connection');
const bookjson = require('./models/books.json');
const user= require('./models/User');
sdk.service({}, function(err, flex) {
  if (err) {
    console.log(err);
  }

  console.log(`===> Flex Service started (SDK v${flex.version})`);
// console.log(handlers);


Kinvey.init({
  appKey: 'kid_r1MKta2TB',
  appSecret: 'dd670164043d4f71be17f547db854936'
});



var promise = Kinvey.ping().then(function(response) {
  console.log('Kinvey Connected..Kinvey Service is alive, version: '
              + response.version
              + ', response: '
              + response.kinvey
  );
}).catch(function(error) {
  console.log('Kinvey Ping Failed. Response: ' + error.description);
});









var app = express();
//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//Body Parser
app.use(express.urlencoded({ extended: false}));


//Routes
 app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

// app.use('/helper',require('./handlers/helper'));
// app.use('/dataStore',require('./handlers/dataStore'));
// app.use('/userStore',require('./handlers/userStore'));
// app.use('/User',require('./models/User'));

// app.use('/User', require ('./models/User'));




// app.get('/', function(req, res){  
  
//           var Username = req.query.name; //mytext is the name of your input box 
  
//           res.send('Your Text:' +Username);  
  
//             });  
  

module.exports.userFindByIds = async (context, complete, modules) => {
const options = { useBl: false, useUserContext: true };
const userStore = modules.userStore(options);
userStore.findById('5e1c6e9804411d001624d814', (err, result) => {
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




for (var funcName in handlers) {
  flex.functions.register(funcName, handlers[funcName]);

  console.log('Kinvey Flex Service added');

}



 const flexBooks=flex.data.serviceObject('FlexBooks');
 flexBooks.onGetAll((context, complete, modules)=>{

const books=[
 {
//   Title:'book 1',
//   Country:'India',
//   Language:'English',
//   Company:'LTI'
//   },
//   {
//   Title:'book 2',
//   Country:'England',
//   Language:'English',
//   Company:'LTI'
//   },
//   {
//     Title:'book 3',
//     Country:'Germany',
//     Language:'German',
//     Company:'LTI'
//     },
//     {
//       Title:'book 4',
//       Country:'Newzeland',
//       Language:'English',
//       Company:'LTI'
 }
 ];

 complete()
 .setBody(books)
 .ok()
 .done();

 });

 flexBooks.onGetByQuery((context, complete, modules)=>{
  console.log(context);

  const books=bookjson;
     [{

   
     
      Title:'book 1',
      Country:'India',
      Language:'English',
      Company:'LTI',
      acl:'{"creator":"5df8d053e480ed001687d197"}',
      kmd:'{"lmt":"2019-12-17T14:21:16.785Z","ect":"2019-12-17T14:21:16.785Z"}}',
      },
      {
      Title:'book 2',
      Country:'England',
      Language:'English',
      Company:'LTI'
      },
      {
        Title:'book 3',
        Country:'Germany',
        Language:'German',
        Company:'LTI'
        },
        {
          Title:'book 4',
          Country:'Newzeland',
          Language:'English',
          Company:'LTI'
          }

        ];
   complete()
   .setBody(books)
   .ok()
   .done();
  
   });
 flexBooks.onInsert((context, complete, modules)=>{
   console.log(context.body);


 complete()
 .setBody({status:"Item saved"}
 )
 .ok()
 .done();

 });

const PORT= process.env.PORT ||5000;
app.listen(PORT, console.log('Server started on port ${PORT}'));


// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port
   
//    console.log("Example app listening at http://%s:%s", host, port)
// })
//   // Define a function to execute
  
//   //Register the logTime function as a Flex function
//   for(var funName in handlers){
//   flex.functions.register(funName, handlers[funName]);
//   }
});