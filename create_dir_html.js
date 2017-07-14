'use strict';
const jsdom = require("jsdom");
var path = require("path");
const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '<meta charset="utf-8">' +
    '<title>!</title>' +
    '<style>' +
    '.s1 {' +
    'border-style: solid;' +
    'border-color: #ACD6FF;' +
    'border-width: 5px;' +
    'padding: 20px;' +
    'margin: 20px;' +
    '}' +
    '</style>' +
    '</head>' +
    '<body>' +
    '</body>' +
    '</html>');
//console.log(dom.window.document.querySelector("").textContent);

var $ = require('jquery')(dom.window);
//$("body").append("<div>TEST</div>");
//console.log($(":root").html());

function get_html(path_name, key_list) {
    $("body div").remove();
    $("body").append('<div id="back" class="s1"><p></p></div>');
    $("body").append('<div id="MP4" class="s1"><p>MP4</p></div>');
    $("body").append('<div id="dir" class="s1"><p>文件夹</p></div>');
    $("#back").append('<p><a href="getdirpath=' + path_name+ '">' + "back" + '</a></p>');
    key_list.map(function (x) {
        if (x["isFile"]) {
            $("#MP4").append('<p><a href="getfilepath=' + path.join(path_name, x['name']) + '">' + x['name'] + '</a></p>');
            //$("#MP4").append('<p>' + x['name'] + '</p>');
        } else {
            $("#dir").append('<p><a href="getdirpath=' + path.join(path_name, x['name']) + '">' + x['name'] + '</a></p>');
            //$("#dir").append('<p>' + x['name'] + '</p>');
        }
    });
    return $(":root").html();
}

module.exports = get_html;