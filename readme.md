# GL02 - Contexte SRU

Description : Utilitaire en invite de commande destinés aux étudiants et enseignants de l'université centrale de la république de Sealand. Il propose un outil de suivi d'occupation des salles de
cours.

## Installation

1. Assurez-vous d'avoir installé **node.js** sur votre ordinateur.
2. Vérifiez que le fichier **package.json** est présent dans le dossier contenant le projet, puis dans votre terminal tapez la commande suivante pour installer toutes les libraires nécessaires :
```bash
npm install
```


## Utilisation# GL02 - Contexte SRU


## Description 
 Utilitaire en invite de commande destinés aux étudiants et enseignants de l'université centrale de la république de Sealand. Il propose un outil de suivi d'occupation des salles de
cours.
## Installation

1. Assurez-vous d'avoir installé **node.js** sur votre ordinateur.
2. Vérifiez que le fichier **package.json** est présent dans le dossier contenant le projet, puis dans votre terminal tapez la commande suivante pour installer toutes les libraires nécessaires :
```bash
npm install
```


## Utilisation
### Commande générale
```javascript
node index.js <command> <arguments>*
```
### Commande pour afficher l'aide des commandes
```bash
node index.js <command> help
ou 
node index.js <command> -h
```
### SPEC 1 : Recherche d'une salle de cours et de la capacité maximale de la salle
- Commande générale
```bash
node index.js rechercheSalleCours <nomCours>
```
### 
- Exemple d'une commande valide :
```bash
node index.js rechercheSalleCours CL02
```
 - Gestion des erreurs : Affiche un message d'erreur si l'utilisateur ne saisit pas un bon format de nom de cours, par exemple la commande suivante va afficher un message "Invalid Cours !"  ​
```bash 
node index.js rechercheSalleCours abcd
```
### SPEC 2 : Rechercher les créneaux disponibles d'une salle
- Commande générale : 

```bash
node index.js rechercheDispo <salle>
Arguments :
<salle> : la salle dont vous voulez chercher la disponibilité.
```
- Exemple d'une commande valide :
node index.js rechercheDispo A210
- Gestion d'erreur: Affiche une erreur si l'utilisateur ne saisit pas un bon format de salle ou si la salle n'existe pas.

### SPEC 3 Rechercher les salles libres pour un créneau donné
- Commande générale : 
```bash
node index.js rechercheSalleDispo <jour> <créneau>
Arguments :
- jour prends les valeurs: L pour Lundi, MA pour Mardi, ME pour mecredi, ... /J/V/S/D
- créneau doit s`écrire sous forme "heureStart:minuteStart-heureEnd:minuteEnd"
```
- Exemple d'une commande valide :
```bash
node index.js rechercheSalleDispo L 10:00-12:30
```
- Gestion d'erreur: Affiche  une erreur si l'utilisateur ne saisit pas un bon format de jour ou de créneau.
### SPEC 4: Générer un fichier iCalendar entre deux dates données
- Commande générale : 
```bash
node index.js genererIcal <dateDebut> <dateFin> <listCours>
Arguments :
dateDebut et dateFin doit s`écrire sous forme "dd-mm-yyyy"
```
- Exemple d'une commande valide :
```bash
node index.js genererIcal 10-12-2021 16-12-2021 GL02-CL02-CL07
```
- Résultat : un fichier au format **calendar.ical** est généré dans le dossier du projet 

- Gestion des erreurs : Affiche un message d'erreur si les dates ou les cours entrés ne sont pas pas au bon format, ou si la **dateDebut** est postérieure à la **dateFin**.

### SPEC 5 : Vérifier la qualité des données d'emploi du temps
- Commande générale : 
```bash
node index.js verifierQualite
```
- Résultat : Afficher les informations sur les incohérences (recouvrements) entre les créneaux des cours.

### SPEC 6 : Générer une visualisation synthétique du taux d'occupation des salles
- Commande générale : 
```bash
node index.js visualTauxOccupation
```
- Résultat : un fichier **resultat.svg** est généré dans le dossier du projet. Il contient un graphique répresentant le taux d'occupation de chaque salle de classe.

### SPEC 7 : Classer et hiérarchiser les capacités d'accueil des salles de classe
- Commande générale : 
```bash
node index.js classementSalle
```
- Résultat : Un classement des salles en fonction de leur capacité. Voir exemple ci-dessous.
```bash
Classement des salles :

Il y a 4 salles de capacite 96
Ce sont les salles : A001 A002 C001 C002

Il y a 3 salles de capacite 72
Ce sont les salles : C102 C104 N101

Il y a 1 salles de capacite 64
Ce sont les salles : B101...
```

## Auteurs
Groupe **les pères fouettards**  GL02 - A21
 * Maxime Cervera, Yohann Corfdir, Marie Dao, Tran Le Vu Long 
