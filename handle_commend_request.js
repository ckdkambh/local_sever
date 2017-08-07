'use strict';

var commend_store = require('./commend_store');
var create_pic_html = require('./create_pic_html');
var exec = require('child_process').exec;

function run_common_commend(commend) {
    return new Promise(function (resolve, reject) {
        exec("chcp 437", function (error, stdout, stderr) {
            if (error) {
                reject('commend1 error');
            }
            exec(commend, function (error, stdout, stderr) {
                if (error) {
                    reject('commend2 error');
                }
                resolve('<pre>'+stdout+'</pre>');
            });
        });
    });
};

module.exports = async function (commend, value) {
    console.log("handle_commend_request :" + commend + "," + value);
    switch (commend) {
        case "store": {
            try {
                await commend_store(value);
                return "success";
            } catch (err) {
                throw err;
            }
            break;
        }
        case "tasklist": {
            try {
                return await run_common_commend("tasklist");
            } catch (err) {
                throw err;
            }
            break;
        }
        case "bai_du_yun_start": {
            try {
                await run_common_commend("F:\\Users\\ff\\AppData\\Roaming\\baidu\\BaiduYunGuanjia\\baidunetdisk.exe");
                return "success";
            } catch (err) {
                throw err;
            }
            break;
        }
        case "bai_du_yun_stop": {
            try {
                await run_common_commend("taskkill /f /t /im baidunetdisk.exe");
                return "success";
            } catch (err) {
                throw err;
            }
            break;
        }
        case "screen_cut": {
            try {
                await run_common_commend("python D:\\gitCode\\python_collection\\src\\ScreenCut.py");
                return create_pic_html("D:\\screen_cut.jpg");
            } catch (err) {
                throw err;
            }
            break;
        }
        case "shutdown": {
            try {
                await run_common_commend("shutdown -s -t 20");
                return "success";
            } catch (err) {
                throw err;
            }
            break;
        }
        default: {
            throw new Error('not support : ' + file_type);
        }
    }
}