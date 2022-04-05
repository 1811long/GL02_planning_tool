const {getAllCours} = require('../GetAllCours.js');
const {getAllFiles} = require('../GetAllCours.js');
const { getAllSalle } = require('./rechercheSalleDispo.js');
const vg = require('vega');
const vegalite = require('vega-lite');
const fs = require('fs');
const clc = require('cli-color');

var listCours = getAllCours();

var getData = function(){
    let listSalle = getAllSalle();
    let dataVisual = [];
    let nbrTotalDeHeures = getTotalHeures();
    for (let salle of listSalle){
        let nbrHeureParSalle = 0;
        for (let Cours of listCours){
            for (let Creneau of Cours.listcreneau){
                if (Creneau.salle == salle){
                    nbrHeureParSalle += calculerheure(Creneau.timeslot);
                }
            }
        }
        let pourcentage = nbrHeureParSalle*100/nbrTotalDeHeures
        dataVisual.push({Salle: salle, TauxOccupation: pourcentage});
    }
    return dataVisual;
}


var getTotalHeures = function(){
    let sum = 0;
    for (let Cours of listCours){
        for (let Creneau of Cours.listcreneau){
            sum += calculerheure(Creneau.timeslot);
        }
    }
    return sum;
}

var calculerheure = function(timeslot){
    let timeStartHeure = timeslot.timeStart.split(':')[0];
    let timeStartMinute = timeslot.timeStart.split(':')[1];
    let timeEndHeure = timeslot.timeEnd.split(':')[0];
    let timeEndMinute = timeslot.timeEnd.split(':')[1];
    let result = parseInt(timeEndHeure) - parseInt(timeStartHeure) + (parseInt(timeEndMinute) - parseInt(timeStartMinute))/60;
    return result;
}
var visualTauxOccupation = function(){
    var dataVisual = getData();
    var avgChart = {
        "width": 1000,
        "height": 600,
        "data" : {
                "values" : dataVisual
        },
        "mark" : "bar",
        "encoding" : {
            "x" : {"field" : "Salle", "type" : "nominal",
                    "axis" : {"title" : "Salle"}
                },
            "y" : {"field" : "TauxOccupation", "type" : "quantitative",
                    "axis" : {"title" : "Taux d'occupation (%)"}
                }
        }
    }
    
    
    
    const myChart = vegalite.compile(avgChart).spec;
    /*
    var runtime = vg.parse(myChart);
    var view = new vg.View(runtime).renderer('canvas').background("#FFF").run();
    var myCanvas = view.toCanvas();
    myCanvas.then(function(res){
        fs.writeFileSync("./result.png", res.toBuffer());
        view.finalize();
        console.log(clc.green("Chart Output est généré dans : ./result.png"));
    })
     */

    /* SVG version */
    var runtime = vg.parse(myChart);
    var view = new vg.View(runtime).renderer('svg').run();
    var mySvg = view.toSVG();
    mySvg.then(function(res){
        fs.writeFileSync("./result.svg", res)
        view.finalize();
        console.log(clc.green("Chart Output est généré dans : ./result.svg"));
    })
}

module.exports = {visualTauxOccupation};

