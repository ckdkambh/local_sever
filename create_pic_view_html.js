'use strict';
var support_type = ["jpg", "png", "jpeg", "gif"];
const jsdom = require("jsdom");
var path = require("path"),
    fs = require("fs"),
    path = require("path");
const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '<meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1" />' +
    '<title>!</title>' +
    '<style>' +
    '.s1 {' +
    'border-style: solid;' +
    'border-color: #ACD6FF;' +
    'border-width: 0.1em;' +
    'padding: 0.2em;' +
    'margin: 0.2em;' +
    '}' +
    'body {font: normal 90% Helvetica, Arial, sans-serif;}' +
    '</style>' +
    '<script src="getjs=>D:/gitCode/local_sever/jquery-3.1.1.js"></script>'+
    '<script src="getjs=>D:/gitCode/local_sever/timer_tools.js"></script>'+
    '<script src="getjs=>D:/gitCode/local_sever/pic_view.js"></script>'+
    '</head>' +
    '<body>' +
    '</body>' +
    '</html>');

var $ = require('jquery')(dom.window);

function get_html(path_name, key_list) {
    $("body div").remove();
    $("body").append('<div id="back" class="s1"><p></p></div>');
    $("body").append('<div id="pic" class="s1"><p>图片</p></div>');
    $("#back").append('<p><a href="getdirpath=>' + path_name + '">' + "back" + '</a></p>');
    $("#back").append('<p>设置时长：<input id="auto_play_interval_timer_length" type="text">   <button id="auto_play_control">' + "启动自动播放" + '</button></p>');
    $("#back").append('<p><label id="progress"></label></p>');
    key_list.map(function (x) {
        $("#pic").append('<p><label val="filepath=>' + path.join(path_name, x['name']) + '" class="none"></label></p>');
    });
    $("#pic").append('<p><img /></p>');
    return $(":root").html();
};

function get_file_list(path_name) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path_name, function (err, files) {
            if (!err) {
                resolve(files);
            } else {
                console.log(err);
                reject([]);
            }
        });
    });
};

var get_file_stat = function (file_path, file_name) {
    return new Promise(function (resolve, reject) {
        fs.stat(path.join(file_path, file_name), function (err, stat) {
            if (!err) {
                resolve({ name: file_name, isFile: stat.isFile(), dateModify: stat.mtime });
            } else {
                console.log(err);
                reject(undefined);
            }
        });
    });
};

module.exports = async (path_name) => {
    var file_stat_list = [];
    var files = [];
    try {
        files = await get_file_list(path_name);
    } catch (err) {
        console.log(err);
    }
    console.log(files);
    for (var f of files) {
        var key_list = [];
        try {
            key_list = await get_file_stat(path_name, f);
        } catch (err) {
            console.log(err);
            continue;
        }
        var is_support =
            support_type.map((x) => {
                return f.endsWith(x);
            }).reduce((x, y) => {
                return x || y;
            });  
        if (key_list["isFile"] === true && is_support) {
            file_stat_list.push(key_list);
        }
    }
    file_stat_list = file_stat_list.sort((x, y) => {
        return y["dateModify"] - x["dateModify"];
    });
    return get_html(path_name, file_stat_list);
};