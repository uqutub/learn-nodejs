const fs = require('fs');

// console.log('AAAAAAAAAAAAAaa ')
// var files = fs.readdirSync('./');

// console.log('BBBBBBBBBBBBBB', files);

fs.readdir('./', function(err, files) {
    if(err) {
        console.log('Err: ', err)
    } else {
        console.log('Files: ', files);
    }
})