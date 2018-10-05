'use strict';

function get_html(name) {
    var result = '<head><meta charset="utf-8"><title>!</title></head><body><div id="cont"><img src="filepath=>'+
    name+
    '"/></div></body>';
    console.log(result);
    return result;
}

module.exports = get_html;