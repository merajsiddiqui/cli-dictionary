var Wordnick = function(config){
	this.api = config.api;
	this.api_key = config.apiKey;
}

Wordnick.prototype.example = function(word){
	return "Hello";
};

Wordnick.prototype.synonym = function(word){
	let end_point = "word.json/"+word+"/relatedWords?relationshipTypes=synonym&limitPerRelationshipType=10";
	let api_uri = this.api + endpoint + "?"+this.api_key;
	return endpoint;
}

Wordnick.prototype.antonym = function(word){
	let end_point = "word.json/"+word+"/relatedWords?relationshipTypes=antonym&limitPerRelationshipType=10";
	let api_uri = this.api + endpoint + "?"+this.api_key;
	return endpoint;
};

Wordnick.prototype.definition = function(word){

}

Wordnick.prototype.wordOfTheDay = function(){
	let endpoint = "words.json/wordOfTheDay";
	let api_uri = this.api + endpoint + "?"+this.api_key;
	return api_uri;
}

module.exports = Wordnick;

http://api.wordnik.com:80/v4/word.json/insane/relatedWords?relationshipTypes=synonym