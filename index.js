#!/usr/bin/env node
const config = require("./config/config.json");
const Wordnick = require("./lib/wordnick");
const printer = require("./lib/printer");
const chalk = require("chalk");
const player = require("./lib/player");
/**
 * Dictionary object to call methods on dictiionary
 * @type {wordnick}
 */

const commandProcessor = (commands) => {
	const dict = new Wordnick(config.wordnick);
	const commPlayer = new player(dict);
	const print = new printer(dict);
	let accepeted_comommands = [
		"syn",
		"ant",
		"def",
		"ex",
		"play",
		"dict"
	];
	if(commands.length==4){
		let command = commands[2];
		let word = commands[3];
		if(accepeted_comommands.indexOf(command) ==-1 ){
			console.log(chalk.red("Invalid command Provided"));
			console.log(chalk.yellow("Use : `dict --help` or `dict -h` to get help"));
			process.exit(2);
		}else{
			if(command=="syn"){
				console.log(chalk.grey("Entered word"),":", chalk.white(word));
				print.synonyms(word,true);
			}
			else if(command == "ant"){
				console.log(chalk.grey("Entered word"),":", chalk.white(word));
				print.antonyms(word,true);
			}
			else if(command == "def"){
				console.log(chalk.grey("Entered word"),":", chalk.white(word));
				print.definition(word,true);
			}
			else if(command == "dict"){
				console.log(chalk.grey("Entered word"),":", chalk.white(word));
				print.definition(word,false);
				print.example(word,false);
				print.example(word,false);
				print.synonyms(word, false);
				print.antonyms(word,false);
			}
			else if(command == "ex"){
				console.log(chalk.grey("Entered word"),":", chalk.white(word));
				print.example(word,true);
			}
		}
	}
	else if(commands.length==3){
		let arg = commands[2];

		if(arg=="--help" || arg=="-h"){
			console.log("Print helps here");
		}
		else if(arg == "play"){
			console.log("Welcome to the Word Game");
			commPlayer.startgame((game_data)=>{
				let startMessage = commPlayer.provideHint();
				console.log(startMessage);
				console.log("Enter the answer");
				console.log("word is", game_data.word);
				commPlayer.verifyAnswer("someRandomWord",(resp)=>{
					if(resp.type=="success"){
						consoe.log(resp.message);
						process.exit();
					}
					else if(resp.type=="failed"){
						console.log(resp.message);
						process.exit();
					}else{
						commPlayer.retry_count = commPlayer.retry_count + 1;
					}
				});
			});
		}
		else{
			console.log(chalk.grey("Entered word"),":", chalk.white(arg));
			print.definition(arg,false);
			print.example(arg,false);
			print.synonyms(arg, false);
			print.antonyms(arg,false);
		}

	}
	else if(commands.length==2){
		dict.wordOfTheDay((response)=>{
			let wordOfTheDay = response.word;
			console.log(chalk.yellow("Word of the day"), chalk.white(wordOfTheDay));
			print.synonyms(wordOfTheDay);
			print.antonyms(wordOfTheDay);
			console.log(chalk.green("Usage example for the word of the day"));
			for(let i = 0; i < response.usage_examples.length;i++){
				console.log(chalk.yellow(i+1 +":" +response.usage_examples[i]+"\n"));
			}
			print.definition(wordOfTheDay);
		});
	}
}


commandProcessor(process.argv);