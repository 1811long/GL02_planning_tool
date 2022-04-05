var Cours = function(nom,listcreneau){
    this.nom = nom;
    this.listcreneau = listcreneau;
}

Cours.prototype.addCreneau = function(creneau){
    this.listcreneau.push(creneau);
}

module.exports = Cours;