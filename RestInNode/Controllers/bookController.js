var bookController = function(Book){

	var postFunction = function(req, res){
		var book = new Book(req.body);
		book.save();
		res.status(201).send(book);
	}

	var getFunction = function(req, res){
		var query = {};

		if(req.query){
			query = req.query;
		}

		Book.find(query,(err,books)=>{
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(books);
			}
		});
	}

	return {
		postFunction : postFunction,
		getFunction : getFunction
	}
}

module.exports = bookController;