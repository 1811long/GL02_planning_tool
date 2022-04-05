var Cours = require('./Cours.js');
var Creneau = require('./Creneau.js');
var timeslot = require('./Timeslot.js');

//CruParser.js

var CruParser = function(sTokenize, sParsedSymb){
	// The list of Cours parsed from the input file.
	this.parsedCours = [];
	this.showTokenize = sTokenize;
	this.showParsedSymbols = sParsedSymb;
	this.errorCount = 0;
}

CruParser.prototype.tokenize = function(data){
    var separator = /(\r\n|\/\/\r\n)/;
	data = data.split(separator);
	data = data.filter((val, idx) => !val.match(separator) && val); 					
	return data;			
}

CruParser.prototype.errMsg = function(msg, input){
	this.errorCount++;
	// console.log("Parsing Error ! on "+input+" -- msg : "+msg);
}

CruParser.prototype.parse = function(data){
	var tData = this.tokenize(data);
	if(this.showTokenize){
		console.log(tData);
	}
	this.listCours(tData);
}

CruParser.prototype.next = function(input){
	var curS = input.shift();
	if(this.showParsedSymbols){
		console.log(curS);
	}
	return curS
}

//Parser rules
CruParser.prototype.listCours = function(input){
    this.Cours(input);
}

CruParser.prototype.Cours = function(input){    
    var args = this.body(input);
	var p = new Cours(args.nom,[]);
	this.listCreneau(input,p);
	this.parsedCours.push(p);
	if (input.length > 0){
		this.Cours(input);
	}
}

//<body> = '+' <nom> <eol> <creneau>*
CruParser.prototype.body = function(input){
    var nom = this.nom(input);
    return {
		nom : nom,
	};
}

CruParser.prototype.nom = function(input){
    var curS = this.next(input);
    if (matched = curS.match(/[A-Z]{1,4}[0-9]{0,2}[A-Z]?/)){
        return matched[0];
    }else{
		this.errorCount++;
    }
}

CruParser.prototype.listCreneau = function(input,curCours){
	if (input.length > 0 && input[0][0] != '+'){
		var curS = this.creneau(input);
		if (curS){
			curCours.addCreneau(curS);	
		}
		if (input.length > 0 && input[0][0] != '+'){
			this.listCreneau(input,curCours);
		}
	}
}

CruParser.prototype.creneau = function(input){
	var curS = this.next(input);
	if (matched = curS.match(/(\d)+,([A-Z]\d+),P=(\d*),H=(\w*) ([1-9]:[0-9]{2}|1[0-9]:[0-9]{2}|2[0-4]:[0-9]{2})-([1-9]:[0-9]{2}|1[0-9]:[0-9]{2}|2[0-4]:[0-9]{2}),([A-Z][\d|\w]),S=([A-Z]+\d{0,}){1}/)){
		var creneau = 	{
							numero: matched[1], 
							type: matched[2], 
							capacite: matched[3], 
							jour: matched[4], 
							timeslot: {timeStart: matched[5], timeEnd: matched[6]}, 
							sousindex: matched[7],
							salle: matched[8]
						};
		return creneau;
	}else{
		this.errorCount++;
		return false;
	}
}


module.exports = CruParser;