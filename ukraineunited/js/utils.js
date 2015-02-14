"use strict";

function augment(receiving, giving){
	var optionList = Array.prototype.slice.call(arguments, 2);
	if(optionList.length === 0){
		optionList = Object.keys(giving.prototype);
	}
	optionList.forEach(function(option){
		receiving.prototype[option] = giving.prototype[option];
	});
}

function readFile(file, callback){
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function(){
		if(rawFile.readyState === 4){
			if(rawFile.status === 200 || rawFile.status == 0){
				callback(rawFile.responseText);
			}
		}
	};
	rawFile.send(null);
}

augment(NodeList, Array, 'forEach', 'indexOf', 'filter', 'some', 'every', 'map', 'slice');
augment(HTMLCollection, Array, 'forEach', 'indexOf', 'filter', 'some', 'every', 'map', 'slice');

