
/**
* Connecting modules of nodde.js
*/  
var express = require('express'),
    app = express(),
    restify = require('restify'),
    taskSave = require('save')('human'),
    server = restify.createServer({ name: 'my-api' });



server
  .use(restify.fullResponse())
  .use(restify.bodyParser())


/**
* Returns all tasks
*/
server.get('/human', function (req, res, next) {
  taskSave.find({}, function (error, tasks) {
    res.send(tasks)
  })
});


/**
* Creates a new task with paramenters task, name, _id
*/
server.post('/human', function (req, res, next) {    
    taskSave.create(req.params, function (error, task) {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        res.send(201, task)
    })
});

/**
* Updata status of  task by id
*/
server.put('/human', function (req, res, next) {
    taskSave.update( req.params, function (error, task) {
            if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
            res.send(200, task);
    });
});

/**
*Delete  task by id
*/
server.del('/human', function (req, res, next) {
    taskSave.delete( req.params._id, function (error, task) {
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










