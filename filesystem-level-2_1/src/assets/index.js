const fs = require('fs');
const data = require('../data/data.json');

// Erstelle einen String für die txt-Datei
let textOutput = data.map(item => {
    return `${item.id} - ${item.title}\n${item.description}`;
}).join('\n\n');//Jeder Eintrag ist durch zwei Zeilenumbrüche getrennt.

// Schreibe den String in eine txt-Datei
fs.writeFile('output.txt', textOutput, err => {
    if (err) {
        console.log('Ein Fehler ist aufgetreten:', err);
        return;
    }
    console.log('Super, das hat geklappt und output.txt wurde erstellt!');
});