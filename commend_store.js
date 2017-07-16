'use strict';

var fs = require("fs");

function get_file_stat(file_name) {
    return new Promise(function (resolve, reject) {
        fs.stat(file_name, function (err, stat) {
            if (err) {
                resolve(true);
            } else {
                reject("file is already exist");
            }
        });
    });
};

async function cpoy_file(from_name, to_name) {
    return new Promise(async function (resolve, reject) {
        var rs = fs.createReadStream(from_name);
        var ws = fs.createWriteStream(to_name);
        try {
            await rs.pipe(ws);
            resolve("ok");
        } catch (err) {
            reject(err);
        }

    });
};

module.exports = async function (value) {
    console.log("commend_store :" + value);
    var file_name = value.substring(value.lastIndexOf("/") + 1);
    file_name = "D:\\4444\\" + file_name;
    console.log(file_name);
    try {
        await get_file_stat(file_name);
        await cpoy_file(value, file_name);
    }
    catch (err) {
        throw err;
    }
}