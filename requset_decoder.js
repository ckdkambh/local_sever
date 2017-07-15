supported_kind_list =["mp4", "html"];
module.exports = function (url) {
    var link = url;
    console.log('requset_decoder: ' + link);
    var last1 = link.lastIndexOf("=>");
    var last2 = link.lastIndexOf("/", last1);
    var command_line = link.substring(last2 + 1);
    var result = { conmmend: "", value: "", kind: "" };
    if (command_line === "") {
        result = { conmmend: "", value: "start_page.html", kind: "" };
    } else if (command_line.startsWith("getfilepath")) {
        fileName = command_line.substring("getfilepath=>".length);
        var ext = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
        supported_kind_list.includes(ext);
        if (supported_kind_list.includes(ext)) {
            result = { conmmend: "getfilepath", value: fileName, kind: ext };
        }else {
            throw new Error('not support '+ext);
        }
    } else if (command_line.startsWith("getdirpath")) {
        dirName = command_line.substring("getdirpath=>".length);
        result = { conmmend: "getdirpath", value: dirName, kind: "dir" };
    } else if (command_line.startsWith("filepath")) {
        fileName = command_line.substring("filepath=>".length);
        result = { conmmend: "", value: fileName, kind: "" };
    } else if (command_line.startsWith("favicon.ico")) {
        throw new Error('not support favicon.ico');
    } else {
        result = { conmmend: "", value: command_line, kind: "" };
    }
    return result;
};