const request = require("request");

var Wordnick = function(config){
	this.api = config.api;
	this.api_key = config.apiKey;
}

Wordnick.prototype.example = function(word,callback){
	response = {
		"error" : false,
		"error_message" : "",
		"examples" : []
	}
	let endpoint = "word.json/"+word+"/examples?includeDuplicates=false&limit=5";
	let api_uri = this.api + endpoint + "&api_key="+this.api_key;
	request(api_uri, { json: true }, (err, res, body) => {
		if (err) {
			response.error = true;
			response.error_message = "There is some proble with internet connectivity";
			return callback(response);
		}else{
			if(body.examples.length == 0){
				response.error = true;
				response.error_message = "You might have mis-spelled the word or we are unable to find the word";
				return callback(response);
			}else{
				let count = body.examples.length >3?3:body.examples.length;
				for(let k =0; k<count;k++){
					response.examples.push(body.examples[k].text);
					if(k==count-1){
						return callback(response);
					}
				}
			}
		}
	});
};

Wordnick.prototype.synonym = function(word, callback){
	response = {
		"error" : false,
		"error_message" : "",
		"synonyms" : []
	}
	let endpoint = "word.json/"+word+"/relatedWords?relationshipTypes=synonym&limitPerRelationshipType=10";
	let api_uri = this.api + endpoint + "&api_key="+this.api_key;
	request(api_uri, { json: true }, (err, res, body) => {
		if (err) {
			response.error = true;
			response.error_message = "There is some proble with internet connectivity";
			return callback(response);
		}else{
			if(body.length==0){
				response.error = true;
				response.error_message= `1.You might have mis-spelled the word \n2. synonym for this word does not exist\n3. We are unable to find the word synonym`;
				return callback(response);
			}else{
				response.synonyms =body[0].words;
				return callback(response);
			}
		}
	});
}

Wordnick.prototype.antonym = function(word,callback){
	response = {
		"error" : false,
		"error_message" : "",
		"antonyms" : []
	}
	let endpoint = "word.json/"+word+"/relatedWords?relationshipTypes=antonym&limitPerRelationshipType=10";
	let api_uri = this.api + endpoint + "&api_key="+this.api_key;
	request(api_uri, { json: true }, (err, res, body) => {
		if (err) {
			response.error = true;
			response.error_message = "There is some proble with internet connectivity";
			return callback(response);
		}else{
			if(body.length==0){
				response.error = true;
				response.error_message= `1.You might have mis-spelled the word \n2. Antonyms for this word does not exist \n3. We are unable to find the word antonyms`;
				return callback(response);
			}else{
				response.antonyms = body[0].words;
				return callback(response);
			}
		}
	});
};

Wordnick.prototype.definition = function(word,callback){
	let response = {
		"error" : false,
		"error_message" : '',
		"partofspeech":"",
		"definition":[]
	};
	let endpoint = "word.json/"+word+"/definitions?limit=5";
	let api_uri =  this.api + endpoint + "&api_key="+this.api_key;
	request(api_uri, { json: true }, (err, res, body) => {
		if (err) {
			response.error = true;
			response.error_message = "There is some proble with internet connectivity";
			return callback(response);
		}else{
			if(body.length==0){
				response.error = true;
				response.error_message= `1.You might have mis-spelled the word \n2. definition for this word does not exist \n3. We are unable to find the word definition`;
				return callback(response);
			}else{
				response.partofspeech = body[0].partOfSpeech;
				let count  = body.length > 3 ? 3 : body.length;
				for(let j = 0; j<count;j++){
					response.definition.push(body[j].text);
					if(j==count-1){
						return callback(response);
					}
				}
			}
		}
	});
}

Wordnick.prototype.wordOfTheDay = function(callback){
	let response = {
		"error" : false,
		"error_message" : "",
		"word" : "",
		"usage_examples" : []
	};
	let endpoint = "words.json/wordOfTheDay";
	let api_uri = this.api + endpoint + "?api_key="+this.api_key;
	request(api_uri, { json: true }, (err, res, body) => {
		if (err) {
			response.error = true;
			response.error_message = "There is some proble with internet connectivity";
			return callback(response);
		}else{
			response.word = body.word;
			example_count  = body.examples.length < 5 ?body.examples.length:5; 
			for(var i = 0; i < example_count;i++){
				response.usage_examples.push(body.examples[i].text);
				if(i == example_count-1){
					return callback(response);
				}
			}
		}
	});
}


module.exports = Wordnick;
