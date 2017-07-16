'use strict';

function get_html(name) {
    var test = "type='video/mp4; codecs=\"mp4a.40.5\"'";
    test = '  <source src="filepath=>' + name + '" ' + test + '>';
    var result = '<head><meta charset="utf-8"><title>!</title></head><body><div id="cont"><video controls="controls" autoplay="">' +
        test +
        ' </video></div></body>'
    console.log(result);
    return result;
}

module.exports = get_html;