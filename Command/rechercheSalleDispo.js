const {getAllCours} = require('../GetAllCours.js');
const { rechercheDisponibilite } = require('./rechercheDisponibilite.js');
const { compareTime } = require('./rechercheDisponibilite');
const clc = require('cli-color');

var listCours = getAllCours();

var rechercheSalleDispo = function(jour,creneau){
    let listSalle = getAllSalle();
    let timeStart = creneau.split("-")[0];
    let timeEnd = creneau.split("-")[1];
    for (let salle of listSalle){   
        let horaireDispo = rechercheDisponibilite(salle);
        for (creneau of horaireDispo){
            if (creneau.jour == jour){
                let timeStartDispo = creneau.timeSlotDispo.timeStart;
                let timeEndDispo = creneau.timeSlotDispo.timeEnd;
                if (compareTime(timeStartDispo,timeEnd) >= 0 || compareTime(timeEndDispo,timeStart) <= 0){
                    continue;
                }else if (compareTime(timeStartDispo,timeStart) <= 0 && compareTime(timeEndDispo,timeEnd) >= 0){
<<<<<<< HEAD
                    console.log(`La salle ` + clc.green(salle) + ` est disponible pendant ` + clc.yellow(`${timeStart}-${timeEnd}`));
                }else if (compareTime(timeStartDispo,timeStart) <= 8 && compareTime(timeEndDispo,timeEnd) >= 20){
                    console.log('Mauvaise heure, veuillez entrer une heure entre 8 et 20 heures.');  
                } else if (compareTime(timeStart,timeEnd) <1 ){
                    console.log('Mauvaise heure, Intervalle trop court');   
=======
                    console.log(`La salle ` + clc.green(salle) + ` est disponible !`);
>>>>>>> 8d7a6c92b78170d7996347556661546b23ab9177
                }else{
                    let maxTimeStartDispo;
                    let minTimeEndDispo;
                    if (compareTime(timeStartDispo,timeStart) > 0){
                            maxTimeStartDispo = timeStartDispo;
                    }else{
                            maxTimeStartDispo = timeStart;
                    }
                    if (compareTime(timeEnd,timeEndDispo) > 0){
                            minTimeEndDispo = timeEndDispo;
                    }else{
                            minTimeEndDispo = timeEnd;
                    }
<<<<<<< HEAD
                    //console.log(`La salle ` + clc.green(`${salle}`) + ` n'est pas disponible pendant `+ clc.yellow(`${timeStart} - ${timeEnd}`)  + ` mais elle sera diponible pendant ` + clc.blue(`${maxTimeStartDispo} - ${minTimeEndDispo}`));
=======
                    console.log(`La salle ` + clc.green(`${salle}`) + ` sera diponible pendant ` + clc.blue(`${maxTimeStartDispo} - ${minTimeEndDispo}`));
>>>>>>> 8d7a6c92b78170d7996347556661546b23ab9177
                }
            }
        }
    }

}

var getAllSalle = function(){
    var salles = [];
    for (let Cours of listCours){
        for (Creneau of Cours.listcreneau){
            let salle = Creneau.salle;
            if (salles.includes(salle) == false){
                salles.push(salle);
            }
        }
    }
    return salles;
}

module.exports={rechercheSalleDispo, getAllSalle};