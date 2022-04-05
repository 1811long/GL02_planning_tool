const fs = require('fs');
const path = require('path');
//const { isModuleNamespaceObject } = require('util/types');
const CruParser = require('./CruParser.js');
const currDir = path.join(__dirname + '/./data');

var getAllFiles = function(dirPath,arrayOfFiles) {
    files = fs.readdirSync(dirPath)
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
        if(file.split('.')[1] == "cru") arrayOfFiles.push(path.join(dirPath, "/", file));
    }
    })
    return arrayOfFiles
}
var getAllCours = function(){
    let listfile = [];
    listfile = getAllFiles(currDir,listfile);
    let listCours = [];
    listfile.forEach(function(file){
        let analyzer = new CruParser();
    
        let data = fs.readFileSync(file,'utf-8');
        firstposition = data.indexOf("+",data.indexOf('+UVUV')+1);
        lastposition = data.lastIndexOf("//");

        data = data.substring(firstposition,lastposition);     

        analyzer.parse(data);
        listCours = listCours.concat(analyzer.parsedCours);
    })
    return listCours;
}

module.exports = {
    getAllFiles,
    getAllCours
}

