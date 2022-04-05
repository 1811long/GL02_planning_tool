
const { getAllSalle } = require('./rechercheSalleDispo.js');
const {findMaxCapacite} = require('./rechercheSalle.js');
var listSalle = getAllSalle();
const clc = require('cli-color');


var classementSalle = function(){
    var listSalleCapacite = [];
    var nbrClasse = new Array(1000).fill(0);
    for (let i = 0; i < listSalle.length; i++){
        let salle = listSalle[i];
        let capacite = findMaxCapacite(salle);
        nbrClasse[capacite]++;
        listSalleCapacite.push({Salle: salle, Capacite: capacite});
    }
    
    listSalleCapacite.sort(function(a,b){
        if (b.Capacite === a.Capacite){
            return a.Salle.localeCompare(b.Salle);
        }
        return b.Capacite - a.Capacite;
    })
    console.log("Classement des salles : \n");
    for (let i = 0; i < listSalleCapacite.length; i++){
        let capacite = listSalleCapacite[i].Capacite;
        let salle = listSalleCapacite[i].Salle;
        if (i == 0){
            console.log("Il y a " + clc.green(nbrClasse[capacite]) + " salles de capacite " + clc.red(capacite));
            process.stdout.write("Ce sont les salles : " + clc.yellow(salle) + " ");
            continue;
        }
        if (capacite != listSalleCapacite[i-1].Capacite){
            console.log();
            console.log();
            console.log("Il y a " + clc.green(nbrClasse[capacite]) + " salles de capacite " + clc.red(capacite));
            process.stdout.write("Ce sont les salles : " + clc.yellow(salle) + " ");
        }else{
            process.stdout.write(clc.yellow(salle) + " ");
        }
    }
}

module.exports = {classementSalle};
// ClassementSalle();


