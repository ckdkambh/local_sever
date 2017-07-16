'use strict';
const jsdom = require("jsdom");
var path = require("path"),
    fs = require("fs"),
    path = require("path"),
    iconv = require('iconv-lite');
// request = require('superagent-charset')(require('superagent'));
;
const { JSDOM } = jsdom;

function read_file(file_name) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file_name, function (err, data) {
            if (!err) {
                resolve(iconv.decode(data, "GB2312"));
            } else {
                console.log(err);
                reject([]);
            }
        });
    });
};

module.exports = async (file_name) => {
    console.log(file_name);
    var text;
    try {
        text = await read_file(file_name);
    }
    catch (err) {
        throw new Error('can not get ' + file_name);
    }
    const dom = new JSDOM(text);
    var $ = require('jquery')(dom.window);
    $("title").after('<p><a href="store=>' + file_name + '">' + "保存" + '</a></p>');
    $("title").after('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />');
    return iconv.encode($(":root").html(), "utf-8").toString("utf-8");
}