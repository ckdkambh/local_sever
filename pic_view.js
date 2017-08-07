(function () {
    jQuery(document).ready(function () {
        console.log("1111");
        $("img")[0].style.display = 'block';
        var div_width = $('#pic')[0].clientWidth;
        var imgList = $("img");
        console.log("$('#pic')[0].clientWidth %d", div_width);
        var get_current = function (){
            var i = 0;
            for (; i < imgList.length; i++) {
                if ($("img")[i].style.display === 'block') {
                    return i;
                }
            }
            return -1;
        };

        var show_next = function (){
            var current_id = get_current();
            console.log("show_next current_id %d", current_id);
            if (current_id !== -1) {
                if (current_id < imgList.length - 1) {
                    $("img")[current_id].style.display = 'none';
                    $("img")[current_id + 1].style.display = 'block';
                } else {
                    $("img")[current_id].style.display = 'none';
                    $("img")[0].style.display = 'block';
                }
            }
        };

        var show_prev = function (){
            var current_id = get_current();
            console.log("show_prev current_id %d", current_id);
            if (current_id !== -1) {
                if (current_id > 0) {
                    $("img")[current_id].style.display = 'none';
                    $("img")[current_id - 1].style.display = 'block';
                } else {
                    $("img")[current_id].style.display = 'none';
                    $("img")[imgList.length - 1].style.display = 'block';
                }
            }
        };

        $("img").click(function (x) {
            console.log("offsetX %d", x.offsetX);
            if (x.offsetX < div_width / 3) {
                show_prev();
            } else if (x.offsetX > 2 * div_width / 3) {
                show_next();
            }
        });
    });
})();