const async = require('async');
const { getRandomInt } = require('./utils');
const express= require('express');
const router= express.Router();
var app = express();

module.exports.userDeleteByIds = async (context, complete, modules) => {
  const options = { auseBl: false, useUserContext: false };
  const userStore = modules.userStore(options);

  // Get the ids of the users to be deleted
  const userIds = context.body;

  try {
    await deleteUsers(userIds, userStore);
    complete()
      .setBody({ deletedUsers: userIds })
      .done();
  } catch (error) {
    complete(error)
      .runtimeError()
      .done();
  }
};

module.exports.userClear = async (context, complete, modules) => {
  const options = { auseBl: false, useUserContext: false };
  const userStore = modules.userStore(options);

  const query = new modules.Query();
  query.notEqualTo('username', 'test');

  try {
    const users = await userStore.find(query);
    const userIds = users.map(user => user._id);
    await deleteUsers(userIds, userStore);
    complete()
      .setBody({ deletedUsers: userIds })
      .done();
  } catch (error) {
    complete(error)
      .runtimeError()
      .done();
  }
};




// module.exports.userCreate(Password) = async (context, complete, modules) => {
 
//   const options = { useBl: false, useUserContext: false };
//   const userStore = modules.userStore(options);
//   var Username = req.body.name;
//   var Password=req.body.password;
//   this.Username = Username;
// 	this.Password = Password;
// const user = {
//       KinveyUsername:Username,
//    KinveyPassword:Password
//     };
//  try {
//     const result = await userStore.create(user);
//     complete()
//       .setBody(result)
//       .done();
//       Console.log("User Created:"+ result);
//   } catch (error) {
//     complete(error)
//       .runtimeError()
//       .done();
//   }

//       };



router.post('/register',(req, res)=>{
  console.log(req.body)
  var Username = req.query.name;
  res.send('hello'+ Username);
});

module.exports.userGetRoles = async (context, complete, modules) => {
  const options = { useBl: false, useUserContext: false };
  const userStore = modules.userStore(options);

  const query = new modules.Query();
  query.equalTo('username', 'test');

  try {
    const result = await userStore.find(query);
    complete()
      .setBody(result)
      .done();
  } catch (error) {
    complete(error)
      .runtimeError()
      .done();
  }
};

function deleteUsers(idArray, userStore) {
  const deleteUser = (userId, callback) => {
    userStore
      .remove(userId)
      .then(success => callback())
      .catch(err => callback(err));
  };

  const asyncLimit = 10; // The maximum number of async operations at a time
  // Execute N async taks simultaneously
  async.eachLimit(idArray, asyncLimit, deleteUser, function(err) {
    err ? Promise.reject(err) : Promise.resolve();
  });
}