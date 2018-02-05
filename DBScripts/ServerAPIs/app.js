var server = require("./httpServer");
var router = require("./router");
var requestHandler = require('./requestHandler');

var handle = {};

handle["/"] = requestHandler.Start;
handle["/Start"] = requestHandler.Start;
handle["/Get"] = requestHandler.Get;
handle["/GetAll"] = requestHandler.GetAll;

server.start(router.route, handle);

