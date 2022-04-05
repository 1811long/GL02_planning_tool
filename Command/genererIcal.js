const {getAllCours} = require('../GetAllCours.js');
const ical = require('ical-generator');
const fs = require('fs');
const clc = require('cli-color');

const convertDate = {
    L: 1,
    MA: 2,
    ME: 3,
    J: 4,
    V: 5,
    S: 7,
    D: 0
}

var genererICal = function(date1,date2,listCours){
    var date1 = parseDate(date1);
    var date2 = parseDate(date2);

    if (date1 == false || date2 == false){
        console.log(clc.red("Parsing Error : Date invalid !"));
        return;
    }
    if (date1 > date2){
        console.log(clc.red("La premiere date doit être avant la deuxieme date !"));
        return;
    }
    var listCoursEdt = getAllEdt(listCours);
    var listEvent = [];
    let dateCur = new Date(date1);
    while (dateCur <= date2){

        for (let Cours of listCoursEdt){
            for (let Creneau of Cours.listcreneau){
                let jour = Creneau.jour;
                if(convertDate[jour] === dateCur.getDay()){
                    var timeStart = Creneau.timeslot.timeStart;
                    var timeEnd = Creneau.timeslot.timeEnd;
                    var heureStart = timeStart.split(":")[0];
                    var minuteStart = timeStart.split(":")[1];
                    var heureEnd = timeEnd.split(":")[0];
                    var minuteEnd = timeEnd.split(":")[1];
                    var DTSTART  = new Date(dateCur);
                    var DTEND = new Date(dateCur);
                    var nomCours = Cours.nom;
                    DTSTART.setHours(heureStart,minuteStart,0);
                    DTEND.setHours(heureEnd,minuteEnd,0);
                    var newEvent = {
                        start: DTSTART,
                        end: DTEND,
                        summary: 'Cours/TD/TP: ' + nomCours,
                        descripton: 'Un cours de UTT',
                        location: "UTT",
                        url: 'utt.fr'
                    }
                    listEvent.push(newEvent);
                };
            }
        }
        let newDate = dateCur.setDate(dateCur.getDate() + 1);
        dateCur = new Date(newDate);
    }
    var calendar = ical({name: 'CalendarDeCours'});
    for (let event of listEvent){
        calendar.createEvent(event);
    }
    calendar.saveSync('./calendar.ical');
    console.log(clc.green('Fichier Ical est généré dans ./calendar.ical'));
}

function getAllEdt(listCoursInscrits){
    var listCours = getAllCours();
    var detailCoursInscrits = [];
    for (let Cours of listCoursInscrits){
        for (let Cours1 of listCours){
            if (Cours1.nom == Cours){
                detailCoursInscrits.push(Cours1);
            }
        }
    }
    return detailCoursInscrits;
}

function parseDate(stringDate){
    var pattern = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
    if (arrayDate = stringDate.match(pattern)){
        return new Date(arrayDate[3], arrayDate[2]-1,arrayDate[1]);
    }else{
        return false;
    }
}


module.exports = {genererICal};