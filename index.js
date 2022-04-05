const cli = require("@caporal/core").default;
const {rechercheSalle} = require('./command/rechercheSalle.js')
const {rechercheDisponibilite} = require('./command/rechercheDisponibilite.js')
const {rechercheSalleDispo}  = require('./command/rechercheSalleDispo.js')
const {genererICal} = require('./Command/genererIcal.js')
const {verifierQualite} = require('./Command/veriferQualite.js');
const {visualTauxOccupation} = require('./Command/visualTauxOccupation.js');
const {classementSalle} = require('./Command/classementSalle');
const clc = require('cli-color');
cli
	.version('cru-parser-cli')
	.version('0.07')
	//SPEC1
	.command('rechercheSalleCours', 'Recherche toutes les salles où a lieu le cours et leur capacité maximale')
	.argument('<nomCours>', 'Le cours que vous voulez rechercher: ex: GL02')
	.action(({args,logger}) => {
		var pattern = /[A-Z]{1,4}[0-9]{0,2}[A-Z]?/;
		var nomCours = args.nomCours;
		if (matched = nomCours.match(pattern)){
			rechercheSalle(matched[0]);
		}else{
			logger.info("Invalid Cours !");
		}
	})


	//SPEC2
	.command('rechercheDispo', 'Recherche toutes les disponibilités d\'une salle pendant la semaine')
	.argument('<salle>', 'La salle dont vous voulez connaître les disponibilités, ex: A210')
	.action(({args,logger}) => {
		var pattern = /[A-Z]+\d{0,}/;
		var salle = args.salle;
		if (matched = salle.match(pattern)){
			var result = rechercheDisponibilite(matched[0]);
			if(result)	console.table(result);
		}else{
			logger.info("Invalid salle !");
		}
	})

	// SPEC3
	.command('rechercheSalleDispo','Recherche les salles disponibles pendant un créneau donné')
	.argument('<jour>', 'Le jour pour lequel vous voulez chercher les salles disponibles \n écrire L pour lundi, MA pour mardi, ...ME/J/V/S/D')
	.argument('<creneau>', 'Le créneau recherché, écrit sous forme heureDebut-heureFin, ex : `10:00-12:30`')
	.action(({args,logger})=>{
		var jour = args.jour;
		var creneau = args.creneau;
		var pattern = /([1-9]:[0-9]{2}|1[0-9]:[0-9]{2}|2[0-4]:[0-9]{2})-([1-9]:[0-9]{2}|1[0-9]:[0-9]{2}|2[0-4]:[0-9]{2})/
		if (jour != "L" && jour != "MA" && jour != "ME" && jour != "J" && jour != "V" && jour != "S" && jour != "D"){
			logger.info("Invalid jour !") ;
		}else if (creneau.split("-")[1].split(":")[0] - creneau.split("-")[0].split(":")[0] > 20){
			console.log(`Timeslot is too long, you should enter a creneau shorter than 20h`);
		}else if (matched = creneau.match(pattern)){
			let timeStart = creneau.split("-")[0];
			let timeEnd = creneau.split("-")[1];
			console.log(`Les cours suivants sont disponible ` + clc.yellow(`${timeStart}-${timeEnd}`));
			rechercheSalleDispo(args.jour,matched[0]);
		}else{
			logger.info("Invalid Creneau !");
		}
	})

	// SPEC4
	.command('genererIcal','Génère un fichier ical contenant tous les créneaux des cours donnés entre deux dates données')
	.argument('<date1>', "Date début, écrite sous forme dd-mm-yy")
	.argument('<date2>', "Date fin, écrite sous forme dd-mm-yy")
	.argument('<listCours>', "Les cours auxquels vous vous inscrivez. Attention il faut écrire sous forme 'cours1-cours2-cours3...'")
	.action(({args,logger})=>{
		var pattern = /[A-Z]{1,4}[0-9]{0,2}[A-Z]?/;
		var Cours = args.listCours;
		var numCours = Cours.split("-").length;
		for (var i = 0; i < numCours; i++) {
			var nomCours = args.listCours.split("-")[i];
			if (matched = nomCours.match(pattern)){
				logger.info(nomCours + " est un cours existant !");
			}else{
				logger.info(nomCours + " est un invalid Cours !");
			}
		}
		genererICal(args.date1,args.date2,args.listCours.split("-"));
	})

	// SPEC5
	.command('verifierQualite','Verifie qu\'un créneau dans une salle est utilisé par 1 seul enseignement à la fois sans recouvrement possible. Affiche les recouvrements trouvés')
	.action(({args})=>{
		verifierQualite();
	})

	// SPEC6
	.command('visualTauxOccupation',"Fournit une visualisation sur le taux d'occupation de chaque salle")
	.action(({args})=>{
		visualTauxOccupation();
	})

	//SPEC7
	.command('classementSalle', 'Classe les salles en fonction de leur capacité')
	.action(({args})=>{
		classementSalle();
	})


cli.run(process.argv.slice(2));
