var Creneau = function (numero,type,capacite,jour,timeslot,sousindex,salle){
    this.numero = numero;
    this.type = type;
    this.capacite = capacite;
    this.jour = jour;
    this.timeslot = timeslot;
    this.sousindex = sousindex;
    this.salle = salle;
}

module.exports = Creneau;