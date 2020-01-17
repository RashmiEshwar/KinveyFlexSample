const handlerFn = Object.assign(
  
    {},

    

    require('./helper'),
    require('./dataStore'),
    require('./userStore'),
    require('../models/User'),
    require('../routes/index'),
    require('../routes/user'),

//     use(expressLayouts),
//     set('view engine','ejs'),
//     use(express.urlencoded({ extended: false});

  );


  module.exports = handlerFn;