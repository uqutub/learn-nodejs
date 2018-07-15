var http = require('http');
var fs = require('fs');
var qs = require('querystring');

const usersList = [{id: 1, name: 'Abc'}, {id: 2, name: 'xyz'}];

// Application Routes/Requests:
//      Get:   /     /users     /user       /user/id
//      Post:  /user

http.createServer(function (req, res) {

    if (req.url == '/users' && req.method == "GET") {
        res.write(JSON.stringify(usersList));
        res.end();
        return;
    }

    if (req.url == '/user' && req.method == "POST") {
        var body = '';
        req.on('data', function (data) {
            console.log('on data ', data);
            body += data;
            
        });
        req.on('end', function () {
            console.log('body ', body);
            var POST = qs.parse(body);
            console.log('POST ', POST);
            res.write(JSON.stringify(POST));
            res.end();
        });

        return;
    }

    if (req.url == '/user' && req.method == "GET") {
        res.write('My User Information');
        res.end();
        return;
    }

    if (req.url.indexOf('/user/') > -1 && req.method == "GET") {
        var id = req.url.replace('/user/', '');
        res.write('Show User Information which have id: ' + id);
        res.end();
        return;
    }

    if (req.url == '/') {
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });
        return;
    }

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('Invalid Route');
    res.end();


}).listen(8080);