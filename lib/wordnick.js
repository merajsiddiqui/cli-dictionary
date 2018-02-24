const request = require("request");

var Wordnick = function(config){
	this.api = config.api;
	this.api_key = config.apiKey;
}

Wordnick.prototype.example = function(word,callback){
	let endpoint = "word.json/"+word+"/examples?includeDuplicates=false&limit=5";
	let api_uri = this.api + endpoint + "?"+this.api_key;
	request(api_uri, { json: true }, (err, res, body) => {
		if (err) {
			return console.log(err);
		}else{
			return callback(body);
		}
	});
};

Wordnick.prototype.synonym = function(word, callback){
	let end_point = "word.json/"+word+"/relatedWords?relationshipTypes=synonym&limitPerRelationshipType=10";
	let api_uri = this.api + endpoint + "?"+this.api_key;
	request(api_uri, { json: true }, (err, res, body) => {
		if (err) {
			return console.log(err);
		}else{
			return callback(body);
		}
	});
}

Wordnick.prototype.antonym = function(word,callback){
	let end_point = "word.json/"+word+"/relatedWords?relationshipTypes=antonym&limitPerRelationshipType=10";
	let api_uri = this.api + endpoint + "?"+this.api_key;
	let apiResponse = this.request(api_uri);
	request(api_uri, { json: true }, (err, res, body) => {
		if (err) {
			return console.log(err);
		}else{
			return callback(body);
		}
	});
};

Wordnick.prototype.definition = function(word,callback){
	let endpoint = "word.json/"+word+"/definitions?limit=20";
	let api_uri =  this.api + endpoint + "?"+this.api_key;
	request(api_uri, { json: true }, (err, res, body) => {
		if (err) {
			return console.log(err);
		}else{
			return callback(body);
		}
	});
}

Wordnick.prototype.wordOfTheDay = function(callback){
	let endpoint = "words.json/wordOfTheDay";
	let api_uri = this.api + endpoint + "?"+this.api_key;
	request(api_uri, { json: true }, (err, res, body) => {
		if (err) {
			return console.log(err);
		}else{
			return callback(body);
		}
	});
}


module.exports = Wordnick;
