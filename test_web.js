var create_html_html = require('./create_html_html'),
    iconv = require('iconv-lite');
var fs = require("fs");
var path = require("path");
// async function test(){
//     await create_html_html("D:\\1111\\带婴儿打飞的技巧 - .html");
// }
// var exec = require('child_process').exec;
// var cmd = 'tasklist';

// var write_file = function (file_name, data) {
//     return new Promise(function (resolve, reject) {
//         fs.writeFile(file_name, data, 'utf-8', function (err) {
//             if (!err) {
//                 resolve("ok");
//             } else {
//                 reject(err);
//             }
//         });
//     });
// };

// exec("chcp 437", function (error, stdout, stderr) {
//     exec("tasklist", function (error, stdout, stderr) {
//         write_file("output.html", stdout);
//     });
// });

fs.readdir("D:\\debug", function (err, files) {
    files.forEach((x) => {
        if (x.endsWith("txt")) {
            fs.readFile(path.join("D:\\debug", x), function (err, data) {
                console.log(data);
            });
        }
    });
});