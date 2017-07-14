'use strict';

var fs = require("fs");
var path = require("path");
var create_dir_html = require('./create_dir_html');
var create_mp4_html = require('./create_mp4_html');
var html_text = "";
function create_html(file_type, name) {
    console.log("create_html:" + file_type + "," + name);
    if (file_type === "mp4") {
        html_text = create_mp4_html(name);
    } else if (file_type === "dir") {
        var filePath = name;
        var fileArr = [];
        var file_name_list = [];
        try {
            file_name_list = fs.readdirSync(filePath);
        }
        catch (err) {
            console.log(err);
        }
        console.log(file_name_list);
        file_name_list.forEach(function (filename) {
            try {
                var is_file = fs.statSync(path.join(filePath, filename));
                if (!is_file.isFile() || filename.endsWith("MP4") || filename.endsWith("mp4"))
                    fileArr.push({ name: filename, isFile: is_file.isFile() });
            }
            catch (err) {
                console.log(err);
            }
        });
        console.log(fileArr);
        html_text = create_dir_html(filePath, fileArr);
    }
    fs.writeFileSync('output.html', html_text, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('output ok.');
        }
    });
}



//获取后缀名
function getdir(url) {
    var arr = url.split('.');
    var len = arr.length;
    return arr[len - 1];
}

module.exports = create_html;

