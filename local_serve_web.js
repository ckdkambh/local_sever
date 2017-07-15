'use strict';

var fs = require("fs"),
    http = require('http'),
    handle_html_request = require('./handle_html_request'),
    requset_decoder = require('./requset_decoder');

 var server = http.createServer(async function (request, response) {
    request.url = decodeURI(request.url);
    console.log(request.method + ': ' + request.url);
    var commend = {};
    try {
        commend = requset_decoder(request.url);
    } catch (err) {
        response.writeHead(200);
        response.end('^o^');
        return;
    }
    console.log(JSON.stringify(commend));
    switch (commend["conmmend"]) {
        case "":
        case "filepath": {
            response.writeHead(200);
            fs.createReadStream(commend["value"]).pipe(response);
            break;
        }
        case "getfilepath":
        case "getdirpath": {
            await handle_html_request(commend["kind"], commend["value"]);
            response.writeHead(200);
            fs.createReadStream("output.html").pipe(response);
            break;
        }
        default: {
            response.writeHead(200);
            response.end('^o^');
        }
    }
});

// 让服务器监听8080端口:
server.listen(8050);

console.log('Server is running at http://127.0.0.1:8050/');



