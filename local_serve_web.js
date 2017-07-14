'use strict';

var fs = require("fs"),
    handle_html_request = require('./handle_html_request'),
    http = require('http');

//handle_html_request("mp4", "E:\\迅雷下载1\\Kobayakawa_48-360p.mp4");
//handle_html_request("dir", "E:\\");

var server = http.createServer(function (request, response) {
    request.url = decodeURI(request.url);
    console.log(request.method + ': ' + request.url);
    var last1 = request.url.lastIndexOf("=");
    var last2 = request.url.lastIndexOf("/", last1);
    var fileName = request.url.substring(last2 + 1);
    var mode = "getfile";
    console.log("1:" + fileName);
    if (fileName === "") {
        fileName = "start_page.html";
    } else if (fileName.startsWith("getfilepath=")) {
        console.log("in getfilepath");
        fileName = fileName.substring("getfilepath=".length);
        mode = "mp4";
        handle_html_request(mode, fileName);
        fileName = "output.html";
    } else if (fileName.startsWith("getdirpath=")) {
        console.log("in getdirpath");
        fileName = fileName.substring("getdirpath=".length);
        mode = "dir";
        handle_html_request(mode, fileName);
        fileName = "output.html";
    } else if (fileName.startsWith("filepath=")) {
        console.log("in filepath");
        fileName = fileName.substring("filepath=".length);
    } else if (fileName === "favicon.ico") {
        response.writeHead(200);
        response.end('^o^');
        return;
    }
    console.log("2:" + fileName);
    response.writeHead(200);
    fs.createReadStream(fileName).pipe(response);
});

// 让服务器监听8080端口:
server.listen(8050);

console.log('Server is running at http://127.0.0.1:8050/');



