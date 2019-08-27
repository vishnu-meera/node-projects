var bookIdController = function(Book){

	var use  = function(req,res,next){
		Book.findById(req.params.bookid,(err,book)=>{
			if (err) {
				res.status(500).send(err);
			} else if(book) {
				req.book = book;
				next();
			}else{
				res.status(404).send("no book found");
			}
		});		
	}

	var get = function(req, res){
		res.json(req.book);
	}

	var put = function(req, res){
		console.log(req.book);
		req.book.title = req.body.title;
		req.book.author = req.body.author;
		req.book.genre = req.body.genre;
		req.book.read = req.body.read;
		console.log(req.book);
		req.book.save((err)=>{
			if(err){
				res.status(500).send(err);
			}else{
				res.json(req.book);
			}
		});	
	}

	var patch = function(req, res){
		if(req.body._id){
			delete req.body._id;
		}

		for(var key in req.body){
			req.book[key] = req.body[key];
		}

		req.book.save((err)=>{
			if(err){
				res.status(500).send(err);
			}else{
				res.json(req.book);
			}
		});		
	}

	var remove = function(req,res){
		req.book.remove((err)=>{
			if(err){
				res.status(500).send(err);
			}else{
				res.status(204).send("record removed");
			}
		});
	}

	return {
		use : use,
		get : get,
		put : put,
		patch : patch,
		remove : remove
	}
}

module.exports = bookIdController;