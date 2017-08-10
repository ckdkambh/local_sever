(function () {
    jQuery(document).ready(function () {
        console.log("1111 %s", $("label")[0].className);
        $("label")[0].className = "block";
        var imgList = $("label");
        var islarge = false;
        var get_current = function () {
            var i = 0;
            for (; i < imgList.length; i++) {
                if ($("label")[i].className === 'block') {
                    return i;
                }
            }
            return -1;
        };
        console.log("get_current %d", get_current());
        var show_next = function () {
            var current_id = get_current();
            console.log("show_next current_id %d", current_id);
            if (current_id !== -1) {
                if (current_id < imgList.length - 1) {
                    $("label")[current_id].className = 'none';
                    $("label")[current_id + 1].className = 'block';
                } else {
                    $("label")[current_id].className = 'none';
                    $("label")[0].className = 'block';
                }
            }
        };

        var show_prev = function () {
            var current_id = get_current();
            console.log("show_prev current_id %d", current_id);
            if (current_id !== -1) {
                if (current_id > 0) {
                    $("label")[current_id].className = 'none';
                    $("label")[current_id - 1].className = 'block';
                } else {
                    $("label")[current_id].className = 'none';
                    $("label")[imgList.length - 1].className = 'block';
                }
            }
        };

        var show_img = function () {
            var path = $("label")[get_current()].getAttribute('val');
            $("img")[0].setAttribute('src', path);
        };

        var max_w = window.innerWidth;
        var max_h = window.innerHeight;

        var small_mode = function () {
            $("img")[0].setAttribute('style', 'max-width: ' + window.innerWidth + 'px;');
            $("img")[0].setAttribute('style', 'max-height: ' + window.innerHeight + 'px;');
            islarge = false;
        };

        var large_mode = function () {
            $("img")[0].setAttribute('style', 'max-width: 3000 px;');
            $("img")[0].setAttribute('style', 'max-height: 3000 px;');
            islarge = true;
        };

        var turn_to_large = function () {
            max_w += 100;
            max_h += 100;
            $("img")[0].setAttribute('style', 'max-width: ' + max_w + 'px;');
            $("img")[0].setAttribute('style', 'max-height: ' + max_h + 'px;');
        }

        var turn_to_small = function () {
            max_w -= 100;
            max_h -= 100;
            $("img")[0].setAttribute('style', 'max-width: ' + max_w + 'px;');
            $("img")[0].setAttribute('style', 'max-height: ' + max_h + 'px;');
        }

        var turn_to_orig = function () {
            max_w = window.innerWidth;
            max_h = window.innerHeight;
            $("img")[0].setAttribute('style', 'max-width: ' + max_w + 'px;');
            $("img")[0].setAttribute('style', 'max-height: ' + max_h + 'px;');
        }

        small_mode();
        show_img();

        $("img").click(function (x) {
            console.log("screenX %d", x.offsetX);
            if (!islarge) {
                if (x.offsetX < $("img")[0].width / 3) {
                    show_prev();
                } else if (x.offsetX > 2 * $("img")[0].width / 3) {
                    show_next();
                } else {
                    large_mode();
                }
            } else {
                small_mode();
            }

            show_img();
        });

        $(document).keydown(function (event) {
            console.log('press key :' + event.keyCode);
            if (event.keyCode === 65) {
                show_prev();
            } else if (event.keyCode === 68) {
                show_next();
            } else if (event.keyCode === 87) {
                turn_to_large();
            } else if (event.keyCode === 83) {
                turn_to_small();
            } else if (event.keyCode === 81) {
                turn_to_orig();
            }
            show_img();
        });
    });
})();