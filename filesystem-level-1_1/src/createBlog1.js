const { log } = require('console');
const fs = require('fs');
// const { createFile } = require('./index')

fs.writeFile('blog1.txt', 'Hello World', (err) => {
    if (err) {
        console.log('Ein fehler ist aufgetreten', err);
        return;
    }
    console.log('blo1.txt wurde erstellt und "Hello world"  wurde eingesetzt');
})