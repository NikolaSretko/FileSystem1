// const fs = require('fs');
//======================HARD-CODE======================================
// fs.writeFile('blog1.txt', 'Ich bin ein Web-dev', (err) => {
//     if (err) {
//         console.log('der inhalt konnte nicht geändert werden', err);
//         return;
//     }
//     console.log('Der neue Inhalt wurde erfolgreich überschrieben');
// });

// fs.writeFile('blog2.txt', 'MERN-Stack', (err) => {
//     if (err) return console.log('Das hat leider nicht geklappt', err);
//     else console.log('Super du hast eine neue datei Erstellt');
// })
//........
//======================HARD-CODE======================================
//======================FLEX-CODE======================================
const fs = require('fs');

// Funktion zum Erstellen einer Datei
function createFile(fileName, content, callback) {
    fs.writeFile(fileName, content, err => {
        if (err) {
            console.log(`Fehler beim Erstellen der Datei ${fileName}: ${err}`);
        } else {
            console.log(`Datei ${fileName} wurde erfolgreich erstellt.`);
        }
        if (callback) callback(err);
    });
}
// exports.createFile = createFile;//exportieren der Funktion um sie in creatBlog1 aufzufrufen 

// Funktion zum Überprüfen und Entfernen einer Datei oder eines Verzeichnisses
function checkAndRemoveFile(directory, callback) {
    fs.stat(directory, (err, stats) => {
        if (err && err.code === 'ENOENT') {
            console.log(`Ordner ${directory} existiert nicht und muss nicht gelöscht werden.`);
            if (callback) callback(null);
        } else if (!err && stats.isDirectory()) {
            fs.rmdir(directory, { recursive: true }, err => {
                if (err) {
                    console.log(`Fehler beim Löschen von ${directory}: ${err}`);
                } else {
                    console.log(`Der Ordner ${directory} wurde erfolgreich gelöscht.`);
                }
                if (callback) callback(err);
            });
        } else if (!err && stats.isFile()) {
            fs.unlink(directory, err => { // Hinzugefügt, um auch Dateien zu löschen
                if (err) {
                    console.log(`Fehler beim Löschen der Datei ${directory}: ${err}`);
                } else {
                    console.log(`Die Datei ${directory} wurde erfolgreich gelöscht.`);
                }
                if (callback) callback(err);
            });
        }
    });
}

// Funktion zum Erstellen eines Verzeichnisses
function createDirectory(directory, callback) {
    fs.mkdir(directory, err => {
        if (err) {
            console.log(`Fehler beim Erstellen des Ordners ${directory}: ${err}`);
        } else {
            console.log(`Ordner ${directory} wurde erfolgreich erstellt.`);
        }
        if (callback) callback(err);
    });
}

// Funktion zum Erstellen und Umbenennen einer Datei
function createAndRenameFile(originalName, newName, content, callback) {
    createFile(originalName, content, err => {
        if (err) {
            if (callback) callback(err);
            return;
        }
        fs.rename(originalName, newName, err => {
            if (err) {
                console.log(`Fehler beim Umbenennen der Datei ${originalName} zu ${newName}: ${err}`);
            } else {
                console.log(`Datei ${originalName} wurde erfolgreich zu ${newName} umbenannt.`);
            }
            if (callback) callback(err);
        });
    });
}

// Ausführung der verschiedenen Funktionen in Reihenfolge
createFile('blog1.txt', 'Ich bin ein Web-Dev', err => {
    if (err) return;
    createFile('blog2.txt', 'MERN-Stack', err => {
        if (err) return;
        checkAndRemoveFile('assets', err => {
            if (err) return;
            createDirectory('assets', err => {
                if (err) return;
                checkAndRemoveFile('delete.txt', err => {
                    if (err) return;
                    createFile('delete.txt', 'Vertrauliche Infos', err => {
                        if (err) return;
                        createAndRenameFile('Hello.txt', 'HelloWorld.txt', 'Herzlich willkommen Node');
                    });
                });
            });
        });
    });
});

