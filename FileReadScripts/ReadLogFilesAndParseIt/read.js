'use strict'
var url 			= require('url');
var pattern 		= "Executing search:"
var validUrl 		= require('valid-url');
var moment			= require('moment')

exports.get = function(files,callback1){
	var storesObject = {};
	function filesSearch(i,storesObject) {
		var dateoObj = [];
		if( i < files.length ) {
			Read(storesObject,files[i], function(obj) {
	  			if(i===files.length-1){
	  				let day = moment(files[i].substr(files[i].length-8)).format('YYYY-MM-DD');
					let count=0
					let searchCount=0		
					for (let key in storesObject) {
						if (storesObject.hasOwnProperty(key)) {
						    searchCount +=storesObject[key];
						    count++
						}
					}
	  				callback1({
	  					date : day,
	  					stores : count,
	  					TotalSearchCount : searchCount,
	  					AverageSearchCount : Math.round(searchCount/count)
	  				});
	  			}
	  			else
	    			filesSearch(i+1,obj)	  		
			});
		}
	}
	filesSearch(0,storesObject);
}

function Read(storesObject,file,callback){
	
	var lineReader = require('readline').createInterface({
		input : require('fs').createReadStream(file)
	});
	lineReader.on('line', (line)=>{
				if(line.indexOf(pattern) > -1){
					line = line.substr(line.indexOf(pattern) + pattern.length, line.length);
					line = line.trim();
					if (validUrl.isUri(line)){
						let tempQueryObj = url.parse(line,true).query;
						if(tempQueryObj['q']){
							let store = tempQueryObj['store'].split('|')[0];
							if(store in storesObject){
								storesObject[store]++;
							}else{
								storesObject[store]=1;
							}
						}
					}
				}
			}).on('close', ()=>{
				callback(storesObject);
			});
}




