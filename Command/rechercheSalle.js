const {getAllCours} = require('../GetAllCours.js');
// const {getAllFiles} = require('../GetAllCours.js');

var listCours = getAllCours();

var rechercheSalle = function (nomCours){
    let result = [];
    let checkSalle = [];
    for (let Cours of listCours){
        if (Cours.nom == nomCours){
            for (let Creneau of Cours.listcreneau){
                let salle = Creneau.salle;
                if (!checkSalle.includes(salle)){
                    result.push({Salle: salle,CapaciteMax: findMaxCapacite(salle)});
                    checkSalle.push(salle);
                }
            }
        }
    }
    console.table(result);
}

var findMaxCapacite = function (Salle){
    let maxCapacite = 0;
    for (let Cours of listCours){
        let listcreneau = Cours.listcreneau;
        for (let Creneau of listcreneau){
            if (Creneau.salle == Salle){
                if (parseInt(maxCapacite) < parseInt(Creneau.capacite)){
                    maxCapacite = Creneau.capacite;
                }
            }
        }
    }
    return maxCapacite;
}

module.exports = {rechercheSalle,findMaxCapacite};