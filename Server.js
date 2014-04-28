
/**
* Connecting modules of nodde.js
*/  
var express = require('express'),
    app = express(),
    restify = require('restify'),
    userSave = require('save')('user'),
    server = restify.createServer({ name: 'my-api' });

     userSave.create(
        {
            name : 'Rostyslav Paslavskyy',
            login : 'admin',
            password : 'admin',
            workPlace : 'SoftServe',
            addres : 'Lviv ',
            tel : '0992363934',
            skype : 'S-a-c-h-o-k1',
            email : 'pas.ros.bor@gmail.com',
            logged :false,
        },
        function(){}
      );



server
  .use(restify.fullResponse())
  .use(restify.bodyParser())


/**
* Returns all users
*/
server.get('/user', function (req, res, next) {
  userSave.find({}, function (error, users) {
    res.send(users)
  })
});


/**
* Creates a new user with paramenters user, name, _id,  if a user does not exist
*/
server.post('/user', function (req, res, next) {    
  userSave.find({ login : req.params.login }, function (error, users) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
    if(users.length === 0){
        userSave.create(req.params, function (error, user) {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        res.send(201, user)
      });
    }
    else{
        res.send(501);
    }
  });
});



/**
* Checks whether the user exists. then validates the password
*/
server.post('/loginAndPassword', function (req, res, next){
        userSave.find(req.params, function(error, users){
            if(users.length > 0){
                res.send(users);
            }
            else{
                res.send(502);
            }
        });
    }
)

/**
* Updata status of  user by id
*/
server.put('/user', function (req, res, next) {
    userSave.update( req.params, function (error, user) {
            if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
            res.send(200, user);
    });
});

/**
*Delete  user by id
*/
server.del('/user', function (req, res, next) {
    userSave.delete( req.params._id, function (error, user) {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        res.send()
      })
});

/**
*Get all fikes.
*/
app.use(express.static(__dirname));

/**
*Run servers
*/
server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url)
})
app.listen(5000);










