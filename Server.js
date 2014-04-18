
/**
* Connecting modules of nodde.js
*/  
var express = require('express'),
    app = express(),
    restify = require('restify'),
    userSave = require('save')('user'),
    server = restify.createServer({ name: 'my-api' });



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
* Creates a new user with paramenters user, name, _id
*/
server.post('/user', function (req, res, next) {    
    userSave.create(req.params, function (error, user) {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        res.send(201, user)
    })
});

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










