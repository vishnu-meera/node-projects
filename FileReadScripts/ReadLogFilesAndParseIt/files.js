'use strict'

var servers 	= ['wXXXXXXXXXX1','wXXXXXXXXXX2','wXXXXXXXXXX3']
var moment 		= require('moment');
var fs 			= require('fs');
var get         = require('./read').get
var noOfDays    = 7;

function fileExists(filename){
  try{
    require('fs').accessSync(filename)
    return true;
  }catch(e){
    return false;
  }
}

exports.GetSearchCountObject = function(cb){
	var counter		= noOfDays;
	var searchArray = [];
	for (let i = noOfDays; i > 0; i--) {
		let day 	= moment().subtract(i,"days").format('YYYYMMDD');
		let files 	= []
		for(let j=0 ; j<servers.length ;j++){
			let file = "//" + servers[j] + "/XXXXX/Logs/XXXXXXXXX" + "/XXXXXXXXX.log" + day
		    if (fileExists(file)) {
		    	//console.log(file + " is accessible");
		        files.push(file);
		    } else {
		        //console.log(file + " is not accessible");
		    }
		}
		get(files,function(obj){
			searchArray.push(obj);
			if(--counter===0){
				searchArray = searchArray.sort(function(a,b){
					return new Date(a.date) - new Date(b.date);
				});
				//console.log(searchArray)
				cb(searchArray);
			}
		});
	}
}


//GetSearchCountObject();
