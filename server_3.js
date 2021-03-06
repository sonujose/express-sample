/* Setting up rest api using express  */

var express = require("express"),
http = require("http");
var port = 3000;
var hostname = "localhost";
var path = require("path");
var morgan = require("morgan");
var app = express();
var bodyParser = require('body-parser');

app.use(morgan("dev")); // logging request in console

app.use(express["static"](path.resolve('./public')));

app.use(bodyParser.json());

var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send all the dishes to you!');
})

.post(function(req, res, next){
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);    
})

.delete(function(req, res, next){
        res.end('Deleting all dishes');
});

dishRouter.route('/:dishId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
});

app.use('/dishes',dishRouter);

var server = http.createServer(app);

server.listen(port, hostname, function() {
    console.log(`Server running at ${hostname}:${port}`)
});
