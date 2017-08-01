'use strict';
var supported_kind_list = ["mp4", "html", "jpg"];
module.exports = function (url) {
    var link = url;
    console.log('requset_decoder: ' + link);
    var last1 = link.lastIndexOf("=>");
    var last2 = link.lastIndexOf("/", last1);
    var command_line = link.substring(last2 + 1);
    var result = { commend: "", value: "", kind: "" };
    var fileName, dirName;
    if (command_line === "") {
        result = { commend: "", value: "start_page.html", kind: "" };
    } else if (command_line.startsWith("getfilepath")) {
        fileName = command_line.substring("getfilepath=>".length);
        var ext = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
        supported_kind_list.includes(ext);
        if (supported_kind_list.includes(ext)) {
            result = { commend: "getfilepath", value: fileName, kind: ext };
        } else {
            throw new Error('not support : ' + ext);
        }
    } else if (command_line.startsWith("getdirpath")) {
        dirName = command_line.substring("getdirpath=>".length);
        result = { commend: "getdirpath", value: dirName, kind: "dir" };
    } else if (command_line.startsWith("filepath")) {
        fileName = command_line.substring("filepath=>".length);
        result = { commend: "", value: fileName, kind: "" };
    } else if (command_line.startsWith("store")) {
        fileName = command_line.substring("store=>".length);
        result = { commend: "run", value: fileName, kind: "store" };
    }else if (command_line.startsWith("commend")) {
        fileName = command_line.substring("commend=>".length);
        result = { commend: "run", value: fileName, kind: fileName };
    } else if (command_line.startsWith("favicon.ico")) {
        throw new Error('not support favicon.ico');
    } else {
        result = { commend: "", value: command_line, kind: "" };
    }
    return result;
};