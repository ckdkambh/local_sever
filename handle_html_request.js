'use strict';

var fs = require("fs");
var path = require("path");
var create_dir_html = require('./create_dir_html');
var create_mp4_html = require('./create_mp4_html');
var create_pic_html = require('./create_pic_html');
var create_html_html = require('./create_html_html');
var html_text = "";

var write_file = function (file_name, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(file_name, data, 'utf-8', function (err) {
            if (!err) {
                resolve("ok");
            } else {
                reject(err);
            }
        });
    });
};

module.exports = async function (file_type, name) {
    console.log("create_html:" + file_type + "," + name);
    switch (file_type) {
        case "mp4": {
            html_text = create_mp4_html(name);
            break;
        }
        case "jpg": {
            html_text = create_pic_html(name);
            break;
        }
        case "dir": {
            html_text = await create_dir_html(name);
            break;
        }
        case "html": {
            html_text = await create_html_html(name);
            break;
        }
        default: {
            throw new Error('not support : ' + file_type);
        }
    }
    try {
        await write_file("output.html", html_text);
        console.log("output.html done");
    } catch (err) {
        console.log(err);
    }
}

