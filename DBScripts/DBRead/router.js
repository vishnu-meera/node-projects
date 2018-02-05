function route(pathname,handle,res,postdata){
	console.log("User asked for ",pathname);
	if(typeof handle[pathname] === 'function'){
		return handle[pathname](res);
	}else{
		console.log("No request handler founud for ",pathname);
		res.writeHead(404,{'Content-Type':'text/plain'});
		res.write("404 Not found");
		res.end();
	}
}

exports.route = route;