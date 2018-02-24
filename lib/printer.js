const chalk = require("chalk");

var printer =  function(dict){
	this.dictionary = dict;
}

printer.prototype.synonyms = function(word,exit=false){
	this.dictionary.synonym(word, (response)=>{
		console.log(chalk.blue("Getting synonyms"));
		if(response.error){
			console.log(chalk.red(response.error_message));
			if(exit){
				process.exit(2);
			}
		}
		else{
			console.log(chalk.green("synonyms"));
			for(let i = 0; i < response.synonyms.length;i++){
				console.log(chalk.yellow(i+1+" : " + response.synonyms[i]))
				if(i== response.synonyms.length-1 && exit){
					process.exit(2);
				}
			}
		}
	});
}

printer.prototype.antonyms = function(word,exit=false){
	this.dictionary.antonym(word, (response)=>{
		console.log(chalk.blue("Getting antonyms"));
		if(response.error){
			console.log(chalk.red(response.error_message));
			if(exit){
				process.exit(2);	
			}
		}
		else{
			console.log(chalk.green("antonyms"));
			for(let i =0; i < response.antonyms.length;i++){
				console.log(chalk.yellow(i+1 +" : " + response.antonyms[i]))
				if(i == response.antonyms.length -1 && exit){
					process.exit(2);
				}
			}
		}
	});
}

printer.prototype.definition = function(word,exit=false){
	this.dictionary.definition(word, (response)=>{
		console.log(chalk.blue("Getting definition"));
		if(response.error){
			console.log(chalk.red(response.error_message));
			if(exit){
				process.exit(2);	
			}
		}
		else{
			console.log(chalk.magenta("Part of Speech / Type"),":", chalk.cyan(response.partofspeech));
			console.log(chalk.green("Explaination / Meaning"));
			for(let i =0; i < response.definition.length;i++){
				console.log(chalk.yellow(i+1 +" : " + response.definition[i]))
				if(i == response.definition.length -1 && exit){
					process.exit(2);
				}
			}
		}
	});
}

module.exports = printer;