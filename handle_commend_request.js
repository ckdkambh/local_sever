'use strict';

var commend_store = require('./commend_store');

module.exports = async function (commend, value) {
    console.log("handle_commend_request :" + commend + "," + value);
    switch (commend) {
        case "store": {
            try{
                await commend_store(value);
            }catch(err){
                throw err;
            }
            break;
        }
        default: {
            throw new Error('not support : ' + file_type);
        }
    }
}