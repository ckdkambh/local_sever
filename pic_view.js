var timer_running = false;
var imgList;
var is_auto_play_enable = false;
var auto_play_timer_id;
var key_pressing_timer_id;
var interval_timer_length = 1000;

function get_current() {
    var i = 0;
    for (; i < imgList.length; i++) {
        if (imgList[i].className === 'block') {
            return i;
        }
    }
    return -1;
}

function set_next() {
    var current_id = get_current();
    console.log("show_next current_id %d", current_id);
    if (current_id !== -1) {
        if (current_id < imgList.length - 1) {
            imgList[current_id].className = 'none';
            imgList[current_id + 1].className = 'block';
        } else {
            imgList[current_id].className = 'none';
            imgList[0].className = 'block';
        }
    }
};

function set_prev() {
    var current_id = get_current();
    console.log("show_prev current_id %d", current_id);
    if (current_id !== -1) {
        if (current_id > 0) {
            imgList[current_id].className = 'none';
            imgList[current_id - 1].className = 'block';
        } else {
            imgList[current_id].className = 'none';
            imgList[imgList.length - 1].className = 'block';
        }
    }
};

function show_img() {
    var cur_index = get_current();
    var path = imgList[cur_index].getAttribute('val');
    $("img")[0].setAttribute('src', path);
    ($("#back").find("label"))[0].innerText = "第"+(cur_index+1)+"张，共"+imgList.length+"张";
};

function disable_auto_play(){
    console.log("call  disable_auto_play");
    is_auto_play_enable = false;
    clearInterval(auto_play_timer_id);
}

function show_next_img(){
    console.log("call show_next_img");
    set_next();
    show_img();
}
function show_prev_img(){
    console.log("call show_prev_img");
    set_prev();
    show_img();
}
function enable_auto_play(){
    console.log("call  enable_auto_play");

    is_auto_play_enable = true;
    auto_play_timer_id = setInterval(show_next_img, interval_timer_length);
}
function enable_auto_play_prev(){
    console.log("call  enable_auto_play_prev");

    is_auto_play_enable = true;
    auto_play_timer_id = setInterval(show_prev_img, interval_timer_length);
}

(function () {
    jQuery(document).ready(function () {
        console.log("1111 %s", $("label")[0].className);
        imgList = $("#pic").find("label");
        imgList[0].className = "block";
        var islarge = false;

        console.log("get_current %d", get_current());

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
                    set_prev();
                } else if (x.offsetX > 2 * $("img")[0].width / 3) {
                    set_next();
                } else {
                    large_mode();
                }
            } else {
                small_mode();
            }

            show_img();
        });

        $(document).keyup(function (event) {
            console.log('press key :' + event.keyCode);

            disable_auto_play();
            clearInterval(key_pressing_timer_id);
            if (event.keyCode === 65 || event.keyCode === 37) {
                set_prev();
            } else if (event.keyCode === 68 || event.keyCode === 39) {
                set_next();
            } else if (event.keyCode === 87 || event.keyCode === 38) {
                turn_to_large();
            } else if (event.keyCode === 83 || event.keyCode === 40) {
                turn_to_small();
            } else if (event.keyCode === 81) {
                turn_to_orig();
            }
            show_img();
        });
        $(document).keypress(function (event) {
            console.log('disable auto_play cause of key press');
            is_auto_play_enable = false;
            disable_auto_play();
            $("#auto_play_control")[0].innerText = "启动自动播放";
        });
        // $(document).keydown(function (event) {
        //     console.log('keypress...');
        //     if (event.keyCode === 65 || event.keyCode === 37) {
        //         interval_timer_length = 1000;
        //         key_pressing_timer_id = setTimeout(enable_auto_play_prev, 1500);
        //     } else if (event.keyCode === 68 || event.keyCode === 39) {
        //         interval_timer_length = 1000;
        //         key_pressing_timer_id = setTimeout(enable_auto_play, 1500);
        //     }
        // });

        $("#auto_play_control").click(function(){
            if (is_auto_play_enable){
                is_auto_play_enable = false;
                disable_auto_play();
                $("#auto_play_control")[0].innerText = "启动自动播放";
            }else{
                is_auto_play_enable = true;
                interval_timer_length = parseInt($("#auto_play_interval_timer_length").val() || 1)*1000;
                console.log("interval_timer_length %d", interval_timer_length);
                enable_auto_play();
                $("#auto_play_control")[0].innerText = "关闭自动播放";
            }
        });   
    });
})();