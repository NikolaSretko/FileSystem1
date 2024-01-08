const fs = require('fs');
const path = require('path');

const directoryName = 'txt'//directory Name
const directoryPath = path.join(__dirname, directoryName);

fs.mkdir(directoryPath, { recursive: true }, err => {
    if (err) {
        console.log('Fehler beim Erstellen des Ordners:', err);
    } else {
        console.log('Unterordner wurde erfolgreich erstellt oder existtiert bereits');
    }
});

function writeToTxtFile(filePath, content) {
    fs.stat(filePath, (err, stats) => {
        if (err && err.code === 'ENOENT') {
            fs.writeFile(filePath, content, (err) => {
                if (err) {
                    console.error('Fehler beim Schreiben in die Datei:', err);
                } else {
                    console.log('Datei wurde erstellt und erste Zeilewurde hinzugefügt.');
                }
            });
        } else if (!err && stats.isFile()) {
            fs.appendFile(filePath, '\n' + content, (err) => {
                if (err) {
                    console.error('Fehler beim Hinzufügen einer neuen Zeile:', err);
                } else
                    console.log('Neue Zeile zur existierenden Datei hinzugefügt.');
            });
        } else {
            console.error('Es ist ein unbekannter Fehler aufgetreten:', err)
        }
    })
}

const meinText = 'Das ist ein Text für die txt-Datei.';//File txt
const txtFilePath = path.join(directoryPath, 'txtDatei.txt');//directory path

// Verwenden der Funktion
writeToTxtFile(txtFilePath, meinText);
