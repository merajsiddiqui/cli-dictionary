var player = function(dictionary){
	this.dictionary = dictionary;
	this.game_data = {};
	this.retry_count = 0;
	this.word = "";
}

player.prototype.startgame = function(callback){
	let methodCount = 0;
	var player = this;
	this.dictionary.randomWord((response) => {
		if(response.error){
			console.log(response.error_message);
			process.exit();
		}else{
			requestword = response.word;
			player.game_data["word"] = requestword;
			player.dictionary.synonym(requestword, (response)=>{
				methodCount = methodCount +1;
				if(!response.error){
					player.game_data["synonyms"] = response.synonyms;
				}
			});
			player.dictionary.antonym(requestword, (response)=>{
				methodCount = methodCount +1;
				if(!response.error){
					return player.game_data["antonyms"] = response.antonyms;
				}
			});
			player.dictionary.definition(requestword, (response)=>{
				methodCount = methodCount +1;
				if(!response.error){
					player.game_data["partofspeech"] = response.partofspeech;
					player.game_data["definition"] = response.definition;
				}
			});
			player.dictionary.example(requestword, (response)=>{
				methodCount = methodCount +1;
				if(!response.error){
					player.game_data["examples"] = response.examples;
				}
			});
			if(methodCount==4){
				console.log("exit here");
				//it signifies all data collection are done
				console.log(player.game_data["word"]);
				return callback(player.game_data);
			}
		}
	})
}

player.prototype.verifyAnswer = function(given_answer, callback){
	let response = {
		"type":"",
		"message" :""
	}
	if(given_answer.toLowerCase()== this.game_data.wod.toLowerCase()){
		response.type = "success";
		response.message = "Coongratutions ! Your answer is correct";
		return callback(response);
	}else{
		if(this.retry_count > 3){
			response.type = "failed";
			response.message = "You have retried the maximum time, Practice More";
			return callback(response);
		}else{
			response.type = "hint";
			response.message = this.provideHint();
			return callback(response);
		}
	}
}

player.prototype.provideHint = function(){
	let hintOptionsAvailable = Object.keys(this.game_data);
	let hintparam = this.chooseRandomFromList(hintOptionsAvailable);
	if(hintparam=="word"){
		/**
		 * do the jumble words
		 */
		let wordarry = this.shuffleArray(this.game_data[hintparam].split());
		return "Word jumbled :" + wordarry.join();
	}
	else{
		if(typeof this.game_data[hintparam] == "Array"){
			return hintparam + " : " + this.chooseRandomFromList(this.game_data[hintparam]);
		}else{
			return hintparam + " : "	+ this.game_data[hintparam];
		}
	}
}

player.prototype.chooseRandomFromList = function(listname){
	return listname[Math.floor(Math.random()*listname.length)];
}

player.prototype.shuffleArray = function(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
module.exports = player;