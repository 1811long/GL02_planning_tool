const {getAllCours} = require('../GetAllCours.js');
const {getAllFiles} = require('../GetAllCours.js');

var listCours = getAllCours();
var listDay = ["L","MA","ME","J","V","S"];

var rechercheDisponibilite = function(salle){
    var result = [];
    var horaires = [];
    var check = false;
    for (let Cours of listCours){
        let listcreneau = Cours.listcreneau;
        for (let Creneau of listcreneau){
            if(Creneau.salle == salle){
                check = true;
                let jour = Creneau.jour;
                let timeslot = Creneau.timeslot;
                horaires.push({jour,timeslot});
            }
        }
    }
    if (check == false){
        console.log("Salle n'existe pas !");
        return false;
    }
    horaires.sort(function(o1,o2){
        if (o1.jour === o2.jour){
            let heure1 = o1.timeslot.timeStart.split(':')[0];
            let heure2 = o2.timeslot.timeStart.split(':')[0];
            if (heure1 == heure2){
                let minute1 = o1.timeslot.timeStart.split(':')[1];
                let minute2 = o2.timeslot.timeStart.split(':')[1];
                return minute1 - minute2;
            }
            return heure1 - heure2;
        }
        return listDay.indexOf(o1.jour) - listDay.indexOf(o2.jour);
    })
    for (let day of listDay){
        var timeStart = "8:00";
        for (let edt of horaires){
            if (edt.jour != day) continue;
            if (compareTime(edt.timeslot.timeStart,timeStart) > 0){
                let timeSlotDispo = {timeStart: timeStart, timeEnd: edt.timeslot.timeStart};
                result.push({jour: day, timeSlotDispo});
                timeStart = edt.timeslot.timeEnd;
            }else{
                timeStart = edt.timeslot.timeEnd;
            }
        }
        if (compareTime(timeStart,"20:00") < 0){
            let timeSlotDispo = {timeStart: timeStart, timeEnd: "20:00"};
            result.push({jour: day, timeSlotDispo});
        }
    }
    // console.log(result);
    return result;
}

var compareTime = function(o1,o2){
    let heure1 = o1.split(':')[0];
    let heure2 = o2.split(':')[0];
    if (heure1 == heure2){
        let minute1 = o1.split(':')[1];
        let minute2 = o2.split(':')[1];
        return parseInt(minute1) - parseInt(minute2);
    }
    return parseInt(heure1) - parseInt(heure2);
}


module.exports = {rechercheDisponibilite,compareTime}; 