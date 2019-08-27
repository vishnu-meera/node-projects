var express = require('express');

var routes = function(Book){
	var bookrouter = express.Router();
	var bookController = require('../Controllers/bookController')(Book);
	var bookIdController = require('../Controllers/bookIdController')(Book);

	bookrouter.route('/')
	.post(bookController.postFunction)
	.get(bookController.getFunction);

	bookrouter.use('/:bookid',bookIdController.use);

	bookrouter.route('/:bookid')
	.get(bookIdController.get)
	.put(bookIdController.put)
	.patch(bookIdController.patch)
	.delete(bookIdController.remove);

	return bookrouter;
}

module.exports = routes;