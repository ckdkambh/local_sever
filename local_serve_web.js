'use strict';

var fs = require("fs"),
    http = require('http'),
    handle_html_request = require('./handle_html_request'),
    handle_commend_request = require('./handle_commend_request'),
    requset_decoder = require('./requset_decoder');

var server = http.createServer(async function (request, response) {
    request.url = decodeURI(request.url);
    console.log(request.method + ': ' + request.url);
    var commend = {};
    try {
        commend = requset_decoder(request.url);
    } catch (err) {
        response.writeHead(200);
        response.end(err.toString());
        return;
    }
    console.log(JSON.stringify(commend));
    switch (commend["commend"]) {
        case "":
        case "filepath": {
            response.writeHead(200);
            fs.createReadStream(commend["value"]).pipe(response);
            break;
        }
        case "getfilepath":
        case "getdirpath": {
            try {
                await handle_html_request(commend["kind"], commend["value"]);
                response.writeHead(200);
                fs.createReadStream("output.html").pipe(response);
            } catch (err) {
                response.writeHead(200);
                response.end(err.toString());
                return;
            }
            break;
        }
        case "run": {
            try {
                await handle_commend_request(commend["kind"], commend["value"]);
                response.writeHead(200);
                response.end("success");
            } catch (err) {
                response.writeHead(200);
                response.end(err.toString());
                return;
            }
            break;
        }
        default: {
            response.writeHead(200);
            response.end('do not support commend : ' + commend["commend"]);
        }
    }
});

// 让服务器监听8080端口:
server.listen(8050);

function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

console.log('Server is running at '+getIPAdress()+':8050/');



