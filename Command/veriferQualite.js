const {getAllCours} = require('../GetAllCours.js');
const { compareTime } = require('./rechercheDisponibilite');
const clc = require('cli-color');

var listCours = getAllCours();

var verifierQualite = function(){
    let listCreneau = [];
    let check = true;
    for (Cours of listCours){
        for (Creneau of Cours.listcreneau){
            let nomCours = {nom: Cours.nom};
            let newCreneau = Object.assign(Creneau,nomCours);
            listCreneau.push(newCreneau);
        }
    }
    for (let i = 0; i < listCreneau.length; i++){
        for (let j = i + 1; j < listCreneau.length; j++){
            let creneau1 = listCreneau[i];
            let creneau2 = listCreneau[j];
            if (creneau1.jour == creneau2.jour){
                let heure1 = creneau1.timeslot;
                let heure2 = creneau2.timeslot;
                if (!verifierTimeSlot(heure1,heure2) && creneau1.salle == creneau2.salle){
                    check = false;
                    console.log(clc.yellow("Il y a une erreur d'horaire entre les deux cours suivants:"));
                    console.log("");
                    console.log("Cours " + clc.green(creneau1.nom))
                    console.log("Creneau : "+ creneau1.numero + "," + creneau1.type + "," + "P = " + creneau1.capacite + ",H = "  + creneau1.jour + " " + creneau1.timeslot.timeStart + "-" + creneau1.timeslot.timeEnd + "," +  creneau1.sousindex + ",S = " + creneau1.salle);
                    console.log("Cours " + clc.green(creneau2.nom))
                    console.log("Creneau : "+ creneau2.numero + "," + creneau2.type + "," + "P = " + creneau2.capacite + ",H = "  + creneau2.jour + " " +creneau2.timeslot.timeStart + "-" + creneau2.timeslot.timeEnd + "," + creneau2.sousindex + ",S = " + creneau2.salle);
                    console.log("\n");
                }
            }
        }           
    }
    if (check) console.log("Pas de inconhérence entre les données");
}

var verifierTimeSlot = function(t1,t2){
    let timeStart1 = t1.timeStart;
    let timeEnd1= t1.timeEnd;
    let timeStart2 = t2.timeStart;
    let timeEnd2 = t2.timeEnd;
    if (compareTime(timeStart1,timeEnd2) >= 0 || compareTime(timeStart2,timeEnd1) >= 0){
        return true;
    }else{
        return false;
    }
}


module.exports = {verifierQualite};